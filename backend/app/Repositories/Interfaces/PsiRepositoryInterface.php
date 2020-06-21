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

    public function storeProjeto(Psi $psi,array $projeto);

    public function deleteProjeto(Psi $psi,$projeto);

    public function storeEquipe(Psi $psi,array $equipe);

    public function deleteEquipe(Psi $psi,$equipe);

    public function storeGestao(Psi $psi, array $dadosValidos);

    public function destroyGestao(Psi $psi, $area_gestao, $gestao);
}
