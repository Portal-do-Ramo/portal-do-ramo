<?php

namespace App\Http\Controllers\Vaquinha;

use App\Http\Controllers\ApiController;
use App\Repositories\Interfaces\VaquinhaRepositoryInterface;

class AbstractVaquinhaController extends ApiController
{
    protected $vaquinhaRepository;

    public function __construct(VaquinhaRepositoryInterface $vaquinhaRepository)
    {
        parent::__construct();
        $this->vaquinhaRepository = $vaquinhaRepository;
    }
}
