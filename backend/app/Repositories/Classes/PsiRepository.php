<?php

namespace App\Repositories\Classes;

use App\Models\Equipe;
use App\Models\Projeto;
use App\Models\Psi;
use App\Repositories\Interfaces\PsiRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class PsiRepository implements PsiRepositoryInterface
{
    // ================ PSI ================

    /**
     * Pega todas as PSIs cadastradas no BD
     * Faz uma seleção das informações para ser enviadas para o front-end
     *
     */
    public function index()
    {
        return Psi::select('psis.nome_psi_slug', 'psis.nome_psi', 'psis.data_inicio', 'psis.data_fim', 'psis.gestao_areas_vagas')
            ->with([
                'projetos' => fn($projetos) => $projetos->join('equipes', 'equipes.nome_equipe_slug', '=', 'projetos.nome_equipe')->addSelect('projetos.nome_projeto','projetos.nome_projeto_slug','equipes.nome_equipe')->get()->map(fn($projeto) => ['nome_projeto_slug' => $projeto->nome_projeto_slug, 'nome_projeto' => $projeto->nome_projeto, 'nome_equipe' => $projeto->nome_equipe, 'areas_vagas' => $projeto->pivot->areas_vagas]), 
                'equipes' => fn($equipes) => $equipes->addSelect('equipes.nome_equipe','nome_equipe_slug')->get()->map(fn($equipe) => ['nome_equipe_slug' => $equipe->nome_equipe_slug, 'nome_equipe' => $equipe->nome_equipe, 'areas_vagas' => $equipe->pivot->areas_vagas]),
                'inscricoes' => fn($inscricoes) => $inscricoes->where('inscricoes_psis.membro_inscrito', Auth::id())->addSelect('id', 'nome_psi', 'nome_projeto', 'inscricoes_psis.nome_equipe', 'area_solicitada', 'condicao')
            ])->get();
    }

    public function tiposAreas()
    {
        return [
            'projeto' => Projeto::select('nome_projeto_slug', 'nome_projeto', 'areas')->get(),
            'equipe' => Equipe::selectRaw("nome_equipe_slug, nome_equipe, 'Assessor de Coordenador' AS areas")->whereNull('matricula_assessor')->get(),
            'gestao' => [
                ['nome_slug' => 'assessor-de-gestao', 'nome' => 'Assessor de Gestão'],
                ['nome_slug' => 'assessor-de-presidencia', 'nome' =>'Assessor de Presidência']
            ]
        ];
    }

    /**
     * Cria uma PSI
     * Verifica se os arrays de projetos e equipes existem e adiciona os mesmos nas tabelas pivot
     *
     */
    public function create(array $dadosValidos)
    {
        $psi = Psi::create([
            'nome_psi' => $dadosValidos['nome_psi'],
            'membro_criou' => $dadosValidos['membro_criou'],
            'data_inicio' => $dadosValidos['data_inicio'],
            'data_fim' => $dadosValidos['data_fim'],
            'gestao_areas_vagas' => $dadosValidos['gestao']
        ]);

        foreach ($dadosValidos['projetos'] as $projeto)
        {
            $this->adicionarProjeto($psi, $projeto);
        }

        foreach ($dadosValidos['equipes'] as $equipe)
        {
            $this->adicionarEquipe($psi, $equipe);
        }
        return $psi->nome_psi_slug;
    }

    /**
     * Atualiza uma PSI especifica cadastrada no BD
     * Com base no nome-slug enviado pela rota e uma request validada
     *
     */
    public function update(Psi $psi, array $dadosValidos)
    {
        $psi->update([
            'nome_psi' => $dadosValidos['nome_psi'],
            'data_inicio' => $dadosValidos['data_inicio'],
            'data_fim' => $dadosValidos['data_fim']
        ]);

        $this->storeGestao($psi, $dadosValidos);

        foreach ($dadosValidos['projetos'] as $projeto)
        {
            $this->atualizarProjeto($psi, $projeto);
        }

        foreach ($dadosValidos['equipes'] as $equipe)
        {
            $this->atualizarEquipe($psi, $equipe);
        }
    }

    /**
     * Deleta uma PSI especifica cadastradas no BD
     * Com base no nome-slug passado pela rota
     *
     */
    public function destroy(Psi $psi)
    {
        $psi->delete();
    }


    // ================ PROJETO/PSI ================

    /**
     * Adiciona um projeto a tabela pivot da relação entre projetos e uma PSI especifica
     *
     */
    private function adicionarProjeto(Psi $psi, $projeto)
    {
        $psi->projetos()->attach($projeto['projeto'],['areas_vagas' => $projeto['areas_vagas']]);
    }

    /**
     * Atualiza um projeto na tabela pivot da relação entre projetos e uma PSI especifica
     *
     */
    private function atualizarProjeto(Psi $psi, $projeto)
    {
        $psi->projetos()->updateExistingPivot($projeto['projeto'],['areas_vagas' => $projeto['areas_vagas']]);
    }

    /**
     * Verifica se o projeto que será storado já existe na relaçãp ?
     * Adiciona a tabela pivot da relação entre projetos e uma PSI especifica :
     * Atualiza a tabela pivot da relação entre projetos e uma PSI especifica
     *
     */
    public function storeProjetos(Psi $psi, $projetos)
    {
        foreach($projetos['projetos'] as $projeto)
        {
            $psi->buscaProjeto($projeto['projeto'])->get()->isEmpty() ?
            $this->adicionarProjeto($psi, $projeto) :
            $this->atualizarProjeto($psi, $projeto);
        }
    }

    /**
     * Deleta um projeto da tabela pivot da relação entre projetos e uma PSI especifica
     *
     */
    public function deleteProjeto(Psi $psi, $projeto)
    {
        $psi->buscaProjeto($projeto)->detach();
    }


    // ================ EQUIPE/PSI ================

    /**
     * Adiciona uma equipe a tabela pivot da relação entre equipes e uma PSI especifica
     *
     */
    private function adicionarEquipe(Psi $psi, $equipe)
    {
        $psi->equipes()->attach($equipe['equipe'],['areas_vagas' => $equipe['areas_vagas']]);
    }

    /**
     * Atualiza uma equipe na tabela pivot da relação entre equipes e uma PSI especifica
     *
     */
    private function atualizarEquipe(Psi $psi, $equipe)
    {
        $psi->equipes()->updateExistingPivot($equipe['equipe'],['areas_vagas' => $equipe['areas_vagas']]);
    }

    /**
     * Verifica se a equipe que será storado já existe na relaçãp ?
     * Adiciona a tabela pivot da relação entre equipes e uma PSI especifica :
     * Atualiza a tabela pivot da relação entre equipes e uma PSI especifica
     *
     */
    public function storeEquipes(Psi $psi, $equipes)
    {
        foreach($equipes['equipes'] as $equipe)
        {
            $psi->buscaEquipe($equipe['equipe'])->get()->isEmpty() ?
            $this->adicionarEquipe($psi, $equipe) :
            $this->atualizarEquipe($psi, $equipe);
        }
    }

    /**
     * Deleta uma equipe da tabela pivot da relação entre projetos e uma PSI especifica
     *
     */
    public function deleteEquipe(Psi $psi, $equipe)
    {
        $psi->buscaEquipe($equipe)->detach();
    }

    // ================ GESTAO/PSI ================


    public function storeGestao(Psi $psi, array $dadosValidos)
    {

        $gestaoPSI = collect($psi->gestao_areas_vagas);
        foreach($dadosValidos['gestao'] as $gestao)
        {
            !$gestaoPSI->contains('nome_area_slug', $gestao['nome_area_slug']) ?
                $this->adicionarGestao($psi, $gestao, $gestaoPSI) :
                $this->atualizarGestao($psi, $gestao, $gestaoPSI);
        }
    }

    private function adicionarGestao(Psi $psi, array $gestao, $gestaoPSI)
    {
        $psi->update(['gestao_areas_vagas' => $gestaoPSI->push($gestao)]);
    }

    private function atualizarGestao(Psi $psi, array $gestao, $gestaoPSI)
    {
        $dadosAtualizados = $gestaoPSI->put($gestaoPSI->where('nome_area_slug', $gestao['nome_area_slug'])->keys()->first(), $gestao);
        $psi->update(['gestao_areas_vagas' => $dadosAtualizados]);
    }

    public function destroyGestao(Psi $psi, $area_gestao, $gestao)
    {
        $psi->update(['gestao_areas_vagas' => $gestao->forget($gestao->where('nome_area_slug', $area_gestao)->keys()->first())->values()]);
    }
}
