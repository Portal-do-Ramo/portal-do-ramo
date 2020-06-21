<?php

namespace App\Repositories\Interfaces;

use App\Models\Usuario;
use App\Models\Vaquinha;

interface VaquinhaRepositoryInterface
{
    public function index();

    public function getLast();

    public function create(array $dadosValidos);

    public function addDoacao(Vaquinha $vaquinha, array $dadosValidos);

    public function pertencentes(Usuario $usuario);
}