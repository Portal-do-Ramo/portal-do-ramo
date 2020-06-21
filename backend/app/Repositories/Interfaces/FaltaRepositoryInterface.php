<?php

namespace App\Repositories\Interfaces;

use App\Models\Falta;
use App\Models\Usuario;

interface FaltaRepositoryInterface
{
    public function index();

    public function tipoFaltas();

    public function referentes(Usuario $usuario);

    public function getListaFaltas();

    public function create(array $dadosValidos);

    public function delete(Falta $falta);
}   