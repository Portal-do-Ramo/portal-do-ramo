<?php

namespace App\Http\Controllers\Usuario;

use App\Http\Controllers\ApiController;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;

abstract class AbstractUsuarioController extends ApiController
{
    protected $usuarioRepository;

    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        parent::__construct();
        $this->usuarioRepository = $usuarioRepository;
    }
}
