<?php

namespace App\Repositories\Classes;

use App\Models\Equipe;
use App\Models\InscricaoProjeto;
use App\Models\Projeto;
use App\Models\Usuario;
use App\Models\UsuarioAtivo;
use App\Repositories\Interfaces\ProjetoRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProjetoRepository implements ProjetoRepositoryInterface
{
    public function index()
    {
        return Equipe::select('equipes.nome_equipe', 'equipes.nome_equipe_slug')
            ->with(['projetos' => fn($query) => $query->addSelect('projetos.nome_projeto_slug','projetos.nome_projeto','projetos.nome_equipe','projetos.estagio','projetos.data_inicio','projetos.data_fim')->withCount(['todosMembrosAtivos as contagem_membros' => fn($query) => $query->whereIn('inscricoes_projetos.funcao', ['Membro', 'Líder'])])])
            ->get();
    }

    public function selectProjetos()
    {
        return Projeto::select('nome_projeto_slug', 'nome_projeto')->when(request('usuario'), fn($query) => $query->whereHas('todosMembrosAtivos', fn($query) => $query->where(fn($subQuery) => $subQuery->where('matricula', request('usuario')))))->get();
    }

    public function selectProjetosPSI()
    {
        return Projeto::select('projetos.nome_projeto_slug', 'projetos.nome_projeto', 'projetos.areas')
            ->join('equipes', 'projetos.nome_equipe', '=', 'equipes.nome_equipe_slug')
            ->addSelect('equipes.nome_equipe_slug', 'equipes.nome_equipe')
            ->get();
    }

    public function historicoProjetos(Usuario $usuario)
    {
        return $usuario->inscricoesProjetos()
            ->select('inscricoes_projetos.uuid as uuid_inscricao', 'inscricoes_projetos.area', 'inscricoes_projetos.ativo', 'inscricoes_projetos.funcao', 'inscricoes_projetos.data_criado as data_entrada', 'inscricoes_projetos.data_saida')
            ->join('projetos', 'inscricoes_projetos.nome_projeto', '=', 'projetos.nome_projeto_slug')
            ->addSelect('projetos.nome_projeto_slug', 'projetos.nome_projeto')
            ->join('equipes', 'projetos.nome_equipe', '=', 'equipes.nome_equipe_slug')
            ->addSelect('equipes.nome_equipe_slug', 'equipes.nome_equipe')
            ->get();
    }

    public function getMembros(Projeto $projeto)
    {
        return $projeto->todosMembrosAtivos()
            ->select('usuarios.matricula', 'usuarios.nome_completo', 'usuarios.foto_url')
            ->addSelect('inscricoes_projetos.uuid as uuid_inscricao', 'inscricoes_projetos.funcao', 'inscricoes_projetos.area')
            ->get();
    }

    public function membrosDisponiveis(Projeto $projeto)
    {
        return UsuarioAtivo::has('projetos', '<', 2)
            ->whereDoesntHave('projetos', fn($query) => $query->whereNomeProjetoSlug($projeto->nome_projeto_slug))
            ->select('matricula', 'nome_completo', 'foto_url')
            ->get();
    }

    public function getEventos(Projeto $projeto)
    {
        return $projeto->eventos()->select('eventos.uuid', 'eventos.nome_evento', 'eventos.data_evento', 'eventos.hora_evento', 'eventos.descricao')->get();
    }

    public function create(array $dadosValidos)
    {
        DB::transaction(function () use ($dadosValidos) {

            $projeto = Projeto::create([
                'nome_projeto' => $dadosValidos['nome_projeto'],
                'data_inicio' => $dadosValidos['data_inicio'],
                'data_fim' => $dadosValidos['data_fim'],
                'nome_equipe' => $dadosValidos['nome_equipe'],
                'areas' => $dadosValidos['areas'],
                'link_trello' => $dadosValidos['link_trello']
            ]);

            $projeto->caixa()->create([
                'nome_caixa' => "Caixa {$dadosValidos['nome_projeto']}",
                'porcentagem_orcamento' => $dadosValidos['porcentagem_orcamento']
            ]);

            if($dadosValidos['matricula_lider'])
                $projeto->inscricoes()->save(new InscricaoProjeto(['matricula_membro' => $dadosValidos['matricula_lider'], 'funcao' => 'Líder']));
            if($dadosValidos['matricula_assessor'])
                $projeto->inscricoes()->save(new InscricaoProjeto(['matricula_membro' => $dadosValidos['matricula_assessor'], 'funcao' => 'Assessor']));
        });
    }

    public function update(Projeto $projeto, array $dadosValidos)
    {
        DB::transaction(function () use ($projeto, $dadosValidos) {
            if($projeto->nome_projeto !== $dadosValidos['nome_projeto']) {
                $projeto->caixa->update(['id_relacionado' => Str::slug($dadosValidos['nome_projeto']), 'nome_caixa' => "Caixa {$dadosValidos['nome_projeto']}"]);
                $projeto->eventos()->update(['id_relacionado' => Str::slug($dadosValidos['nome_projeto'])]);
                $projeto->arquivos()->update(['id_relacionado' => Str::slug($dadosValidos['nome_projeto'])]);
            }

            $projeto->update($dadosValidos);
        });

    }

    public function updateAreas(Projeto $projeto, array $dadosValidos)
    {
        $projeto->update(['areas' => $dadosValidos['areas']]);
    }

    public function fecharProjeto(Projeto $projeto)
    {
        DB::transaction(function() use ($projeto) {
            $projeto->caixa->update(['porcentagem_orcamento' => 0, 'ativo' => 0, 'orcamento_atual' => 0]);
            $projeto->inscricoes()->update(['ativo' => 0]);

            $projeto->update(['ativo' => 0]);
        });
    }


    public function addMembro(Projeto $projeto, array $dadosValidos)
    {
        $projeto->inscricoes()->save(new InscricaoProjeto(['matricula_membro' => $dadosValidos['matricula_membro'], 'area' => $dadosValidos['area']]));
    }

    public function addAssessor(Projeto $projeto, array $dadosValidos)
    {
        DB::transaction(function () use ($projeto, $dadosValidos) {
            $inscricaoAssessor = $projeto->inscricoes()->whereAtivo(true)->whereFuncao('Assessor')->first();
            if($inscricaoAssessor)
                $inscricaoAssessor->update(['inscricoes_projetos.ativo' => false]);

            if($dadosValidos['matricula_assessor'])
                $projeto->inscricoes()->save(new InscricaoProjeto(['matricula_membro' => $dadosValidos['matricula_assessor'], 'funcao' => 'Assessor']));
        });
    }

    public function updateMembro(InscricaoProjeto $inscricao, array $dadosValidos)
    {
        DB::transaction(function () use($inscricao, $dadosValidos)
        {
            if($inscricao->funcao != 'Líder' and $dadosValidos['funcao'] == 'Líder' and $inscricaoLider = $inscricao->projeto->inscricoes()->whereAtivo(true)->whereFuncao('Líder')->first())
                $inscricaoLider->update(['funcao' => 'Membro']);

            $inscricao->update(['funcao' => $dadosValidos['funcao'], 'area' => $dadosValidos['area']]);
        });
    }

    public function removeMembro(InscricaoProjeto $inscricao)
    {
        $inscricao->update(['ativo' => false, 'data_saida' => today()->format('d/m/Y')]);
    }

    public function addArquivo(Projeto $projeto, array $dadosValidos)
    {
        $projeto->arquivos()->create(['nome' => $dadosValidos['nome_arquivo'], 'path' => $dadosValidos['path'], 'extensao_arquivo' => $dadosValidos['extensao_arquivo']]);
    }

    public function getArquivos(Projeto $projeto)
    {
        return $projeto->arquivos()->select('arquivos.uuid', 'arquivos.nome', 'arquivos.path', 'arquivos.extensao_arquivo', 'arquivos.data_criado')->get();
    }
}
