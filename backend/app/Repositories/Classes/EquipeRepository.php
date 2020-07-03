<?php

namespace App\Repositories\Classes;

use App\Repositories\Interfaces\EquipeRepositoryInterface;
use App\Models\Equipe;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EquipeRepository implements EquipeRepositoryInterface
{
    public function index()
    {
        return Equipe::select('equipes.nome_equipe_slug', 'equipes.nome_equipe', 'equipes.foto_url', 'equipes.matricula_coordenador', 'equipes.matricula_assessor')
            ->join('usuarios as coordenador', 'equipes.matricula_coordenador', '=', 'coordenador.matricula')
            ->addSelect('coordenador.nome_completo as nome_coordenador')
            ->leftJoin('usuarios as assessor', 'equipes.matricula_assessor', '=', 'assessor.matricula')
            ->addSelect('assessor.nome_completo as nome_assessor')
            ->withCount(['membros as contagem_membros', 'projetos as contagem_projetos'])
            ->get()
            ->each(function($equipe) {
                $equipe->contagem_membros += $equipe->matricula_assessor ? 2 : 1;
            });
    }

    public function selectEquipes()
    {
        return Equipe::select('nome_equipe_slug', 'nome_equipe')->get();
    }

    public function getMembros(Equipe $equipe)
    {
        $assessor = $equipe->assessor()->select('usuarios.matricula', 'usuarios.nome_completo', 'usuarios.foto_url')->first();
        
        return $equipe->membros()->select('usuarios.matricula', 'usuarios.nome_completo', 'usuarios.foto_url')->get()
            ->map(fn($usuario) => $usuario->toArray() + ['funcao' => 'Membro'])
            ->push($equipe->coordenador()->select('usuarios.matricula', 'usuarios.nome_completo', 'usuarios.foto_url')->first()->toArray() + ['funcao' => 'Coordenador'])
            ->push($assessor ? $assessor->toArray() + ['funcao' => 'Assessor'] : NULL)
            ->whereNotNull('matricula')
            ->sortBy(fn($usuario) => ['Coordenador' => 1, 'Assessor' => 2, 'Membro' => 3][$usuario['funcao']])
            ->unique('matricula')
            ->values();
    }

    public function getProjetos(Equipe $equipe)
    {
        return $equipe->projetos()
            ->select('projetos.nome_projeto_slug', 'projetos.nome_projeto', 'projetos.data_inicio', 'projetos.data_fim', 'projetos.estagio', 'projetos.ativo')
            ->orderBy('data_inicio')
            ->get()
            ->each(function($item) {
                $item->setAppends([]);
            });
    }

    public function getEventos(Equipe $equipe)
    {
        return $equipe->eventos()->select('eventos.uuid', 'eventos.nome_evento', 'eventos.data_evento', 'eventos.hora_evento', 'eventos.descricao')->get();
    }

    public function create(array $dadosValidos)
    {
        DB::transaction(function () use ($dadosValidos) {
            $equipe = Equipe::create([
                'nome_equipe' => $dadosValidos['nome_equipe'],
                'matricula_coordenador' => $dadosValidos['matricula_coordenador'],
                'matricula_assessor' => $dadosValidos['matricula_assessor'],
                'capitulo' => $dadosValidos['capitulo'],
                'foto_url' => $dadosValidos['foto_url'] ?? NULL
            ]);
    
            $equipe->caixas()->createMany([
                [
                    'nome_caixa' => "Caixa {$dadosValidos['nome_equipe']}",
                    'porcentagem_orcamento' => $dadosValidos['porcentagem_orcamento']
                ],
                [
                    'nome_caixa' => "Caixa Emergencial {$dadosValidos['nome_equipe']}",
                    'porcentagem_orcamento' => 5.0,
                    'emergencial_equipe' => true
                ]
            ]);

            $equipe->coordenador()->update(['hierarquia_id' => 7]);
            if($dadosValidos['matricula_assessor']) $equipe->assessor()->update(['hierarquia_id' => 5]);
        });
    }

    public function update(Equipe $equipe, array $dadosValidos)
    {
        DB::transaction(function () use ($equipe, $dadosValidos) {
            if($equipe->nome_equipe !== $dadosValidos['nome_equipe']) {
                $equipe->caixas()->update(['id_relacionado' => Str::slug($dadosValidos['nome_equipe']), 'nome_caixa' => "Caixa {$dadosValidos['nome_equipe']}"]);
                $equipe->eventos()->update(['id_relacionado' => Str::slug($dadosValidos['nome_equipe'])]);
                $equipe->arquivos()->update(['id_relacionado' => Str::slug($dadosValidos['nome_equipe'])]);
                $equipe->projetos()->update(['nome_equipe' => Str::slug($dadosValidos['nome_equipe'])]);
            }

            $equipe->update($dadosValidos);
        });
    }

    public function updateLogoEquipe(Equipe $equipe, string $url)
    {
        $equipe->update(['foto_url' => $url]);
    }

    public function addArquivo(Equipe $equipe, array $dadosValidos)
    {
        $equipe->arquivos()->create(['nome' => $dadosValidos['nome_arquivo'], 'path' => $dadosValidos['path']]);
    }

    public function getArquivos(Equipe $equipe)
    {
        return $equipe->arquivos()->select('arquivos.uuid', 'arquivos.nome', 'arquivos.path', 'arquivos.extensao_arquivo', 'arquivos.data_criado')->get();
    }
}
