<?php

namespace App\Repositories\Interfaces;

use App\Models\Caixa;

interface CaixaRepositoryInterface
{
    public function index();

    public function infoGeralCaixa();
    
    public function updateManual(Caixa $caixa, array $dadosValidos);

    public function refletirAlteracaoCaixa(Caixa $caixa, float $dadosValidos); 
}