<?php

namespace App\Repositories\Interfaces;

use App\Models\Equipe;

interface EquipeRepositoryInterface
{
    public function index();

    public function selectEquipes();

    public function getMembros(Equipe $equipe);

    public function getProjetos(Equipe $equipe);

    public function getEventos(Equipe $equipe);

    public function create(array $dadosValidos);

    public function update(Equipe $equipe, array $dadosValidos);

    public function updateLogoEquipe(Equipe $equipe, string $url);

    public function addArquivo(Equipe $equipe, array $dadosValidos);

    public function getArquivos(Equipe $equipe);
}
