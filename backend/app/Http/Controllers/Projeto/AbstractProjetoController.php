<?php

namespace App\Http\Controllers\Projeto;

use App\Http\Controllers\ApiController;
use App\Repositories\Interfaces\ProjetoRepositoryInterface;

abstract class AbstractProjetoController extends ApiController
{
    protected $projetoRepository;

    public function __construct(ProjetoRepositoryInterface $projetoRepository)
    {
        parent::__construct();
        $this->projetoRepository = $projetoRepository;
    }
}