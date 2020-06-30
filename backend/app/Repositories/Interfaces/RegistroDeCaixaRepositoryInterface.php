<?php

namespace App\Repositories\Interfaces;

use App\Models\Caixa;
use App\Models\RegistroDeCaixa;

interface RegistroDeCaixaRepositoryInterface
{
    public function index();

    public function todosRegistrosAnuais();

    public function todosGastosAnuais();

    public function fluxoAnual();

    public function gastosAnuaisEspecificos();
    
    public function processarRegistroExclusivo(RegistroDeCaixa $registroDeCaixa, Caixa $caixa);

    public function getAnosRegistros();

    public function processarRegistro(RegistroDeCaixa $registroDeCaixa);
}