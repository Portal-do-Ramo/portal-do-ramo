<?php

namespace App\Http\Controllers\Strike;

use App\Exports\StrikesAprovadosExport;
use App\Repositories\Interfaces\StrikeRepositoryInterface;

class StrikeExportController extends AbstractStrikeController
{
    public function __construct(StrikeRepositoryInterface $strikeRepository)
    {
        $this->strikeRepository = $strikeRepository;
    }

    public function getListaAprovados()
    {
        return new StrikesAprovadosExport($this->strikeRepository);
    }
}
