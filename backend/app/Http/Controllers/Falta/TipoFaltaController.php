<?php

namespace App\Http\Controllers\Falta;

use App\Repositories\Interfaces\FaltaRepositoryInterface;
use Illuminate\Support\Facades\Cache;

class TipoFaltaController extends AbstractFaltaController
{
    public function __construct(FaltaRepositoryInterface $faltaRepository)
    {
        parent::__construct($faltaRepository);
    }

    /**
     * Retorna todos os tipos de faltas disponíveis na base de dados
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return Cache::remember('tipo-faltas', 1440, fn() => $this->faltaRepository->tipoFaltas());
    }
}
