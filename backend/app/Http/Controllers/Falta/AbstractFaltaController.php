<?php

namespace App\Http\Controllers\Falta;

use App\Http\Controllers\ApiController;
use App\Repositories\Interfaces\FaltaRepositoryInterface;

abstract class AbstractFaltaController extends ApiController
{
    protected $faltaRepository;

    public function __construct(FaltaRepositoryInterface $faltaRepository)
    {
        parent::__construct();
        $this->faltaRepository = $faltaRepository;    
    }
}
