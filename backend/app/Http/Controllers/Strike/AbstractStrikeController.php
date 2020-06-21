<?php

namespace App\Http\Controllers\Strike;

use App\Http\Controllers\ApiController;
use App\Repositories\Interfaces\StrikeRepositoryInterface;

abstract class AbstractStrikeController extends ApiController
{
    protected $strikeRepository;

    public function __construct(StrikeRepositoryInterface $strikeRepository)
    {
        parent::__construct();
        $this->strikeRepository = $strikeRepository;
    }
}
