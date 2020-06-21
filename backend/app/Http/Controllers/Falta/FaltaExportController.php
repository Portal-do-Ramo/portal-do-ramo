<?php

namespace App\Http\Controllers\Falta;

use App\Exports\FaltasExport;
use App\Repositories\Interfaces\FaltaRepositoryInterface;

class FaltaExportController extends AbstractFaltaController
{
    public function __construct(FaltaRepositoryInterface $faltaRepository)
    {
        parent::__construct($faltaRepository);
    }

    public function getListaFaltas()
    {
        return new FaltasExport($this->faltaRepository);
    }
}
