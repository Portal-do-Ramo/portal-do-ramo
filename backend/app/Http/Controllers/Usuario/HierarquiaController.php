<?php

namespace App\Http\Controllers\Usuario;

use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use Illuminate\Support\Facades\Cache;

class HierarquiaController extends AbstractUsuarioController
{
    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        parent::__construct($usuarioRepository);
    }

    /**
     * Retorna todas as hierarquias disponíveis na base de dados
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return Cache::remember('hierarquia', 1440, fn() => $this->usuarioRepository->getHierarquias());
    }
}