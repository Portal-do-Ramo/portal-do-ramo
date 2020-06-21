<?php

namespace App\Http\Controllers\Psi;

use App\Http\Controllers\ApiController;
use App\Repositories\Interfaces\PsiRepositoryInterface;

abstract class AbstractPsiController extends ApiController
{
    protected $psiRepository;

    public function __construct(PsiRepositoryInterface $psiRepository)
    {
        parent::__construct();
        $this->psiRepository = $psiRepository;
    }
}
