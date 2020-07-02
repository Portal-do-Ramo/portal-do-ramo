<?php

namespace App\Repositories\Interfaces;

use App\Models\Caixa;
use App\Models\Equipe;

interface CaixaRepositoryInterface
{
    public function index();

    public function indexPorcentagemEquipesEspecias();

    public function indexPorcentagemProjetosEmergencial(Equipe $equipe);

    public function infoGeralCaixa();
    
    public function updatePorcentagem(array $dadosValidos);

    public function refletirAlteracaoCaixa(Caixa $caixa, float $dadosValidos); 
}