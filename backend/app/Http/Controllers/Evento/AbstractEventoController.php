<?php

namespace App\Http\Controllers\Evento;

use App\Http\Controllers\ApiController;
use App\Repositories\Interfaces\EventoRepositoryInterface;

class AbstractEventoController extends ApiController
{
    protected $eventoRepository;

    public function __construct(EventoRepositoryInterface $eventoRepository)
    {
        parent::__construct();
        $this->eventoRepository = $eventoRepository;
    }
}
