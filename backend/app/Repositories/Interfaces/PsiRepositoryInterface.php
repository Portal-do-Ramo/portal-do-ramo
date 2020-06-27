<?php

namespace App\Repositories\Interfaces;

use App\Models\Psi;

interface PsiRepositoryInterface
{
    public function index();

    public function tiposAreas();

    public function create(array $dadosValidos);

    public function update(Psi $psi, array $dadosValidos);

    public function destroy(Psi $psi);

    public function storeProjetos(Psi $psi,array $projetos);

    public function deleteProjeto(Psi $psi,$projeto);

    public function storeEquipes(Psi $psi,array $equipes);

    public function deleteEquipe(Psi $psi,$equipe);

    public function storeGestao(Psi $psi, array $dadosValidos);

    public function destroyGestao(Psi $psi, $area_gestao, $gestao);
}
