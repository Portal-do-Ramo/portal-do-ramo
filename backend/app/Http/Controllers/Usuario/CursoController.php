<?php

namespace App\Http\Controllers\Usuario;

use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use Illuminate\Support\Facades\Cache;

class CursoController extends AbstractUsuarioController
{
    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        parent::__construct($usuarioRepository);
    }

    /**
     * Retorna todos os cursos disponíveis na base de dados
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return Cache::remember('cursos', 1440, fn() => $this->usuarioRepository->getCursos());
    }
}
