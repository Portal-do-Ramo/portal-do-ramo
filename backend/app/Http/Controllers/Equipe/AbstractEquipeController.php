<?php

namespace App\Http\Controllers\Equipe;

use App\Http\Controllers\ApiController;
use App\Repositories\Interfaces\EquipeRepositoryInterface;

class AbstractEquipeController extends ApiController
{
    protected $equipeRepository;

    public function __construct(EquipeRepositoryInterface $equipeRepository)
    {
        parent::__construct();
        $this->equipeRepository = $equipeRepository;
    }
}
