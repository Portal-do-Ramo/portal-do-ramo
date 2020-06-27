<?php

namespace App\Http\Controllers\Psi;

use App\Http\Requests\Psi\AddEquipePsiRequest;
use App\Models\Psi;
use App\Repositories\Interfaces\PsiRepositoryInterface;

class EquipesPsiController extends AbstractPsiController
{
    public function __construct(PsiRepositoryInterface $psiRepository)
    {
        parent::__construct($psiRepository);
        $this->authorizeResource(Psi::class, 'psi');
    }

    /**
     * Adiciona uma ou mais equipes na PSI
     * Utilizando uma request
     *
     */
    public function store(Psi $psi, AddEquipePsiRequest $equipes)
    {
        $this->psiRepository->storeEquipes($psi, $equipes->validated());
        return response()->json('Equipe adicionada com sucesso', 201);
    }

    /**
     * Remove uma equipe da PSI
     * Com base na PSI e no nome da equipe passados como parametro
     *
     */
    public function destroy(Psi $psi, $nome_equipe)
    {
        $this->psiRepository->deleteEquipe($psi, $nome_equipe);
        return response()->json('Equipe deletada com sucesso', 200);
    }
}
