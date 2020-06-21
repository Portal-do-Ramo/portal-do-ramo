<?php

namespace App\Http\Controllers\Psi;

use App\Http\Requests\Psi\AddProjetoPsiRequest;
use App\Models\Psi;
use App\Repositories\Interfaces\PsiRepositoryInterface;

class ProjetosPsiController extends AbstractPsiController
{
    public function __construct(PsiRepositoryInterface $psiRepository)
    {
        parent::__construct($psiRepository);
        $this->authorizeResource(Psi::class, 'psi');
    }

    /**
     * Adiciona um ou mais projetos na PSI
     * Utilizando uma request
     *
     */
    public function store(Psi $psi, AddProjetoPsiRequest $projeto)
    {
        $this->psiRepository->storeProjeto($psi, $projeto->validated());

        return response()->json('Projeto adicionado com sucesso', 201);
    }

    /**
     * Remove um projeto da PSI
     * Com base na PSI e no nome do projeto passados como parametro
     *
     */
    public function destroy(Psi $psi, $nome_projeto)
    {
        $this->psiRepository->deleteProjeto($psi, $nome_projeto);

        return response()->json('Projeto deletado com sucesso', 200);
    }
}
