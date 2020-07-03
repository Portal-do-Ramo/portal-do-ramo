<?php

namespace App\Observers;

use App\Models\RegistroDeCaixa;
use App\Repositories\Classes\RegistroDeCaixaRepository;
use App\Repositories\Interfaces\CaixaRepositoryInterface;

class RegistroDeCaixaObserver
{
    protected $caixaRepository;
    protected $registroDeCaixaRepository;

    public function __construct(CaixaRepositoryInterface $caixaRepository, RegistroDeCaixaRepository $registroDeCaixaRepository)
    {
        $this->caixaRepository = $caixaRepository;
        $this->registroDeCaixaRepository = $registroDeCaixaRepository;
    }   

    public function mainCreated(RegistroDeCaixa $registroDeCaixa)
    {
        if($registroDeCaixa->exclusivo) 
            $this->registroDeCaixaRepository->processarRegistroExclusivo($registroDeCaixa, $registroDeCaixa->caixa);
        else 
           $this->registroDeCaixaRepository->processarRegistro($registroDeCaixa);
    }

    public function subsequentCreated(RegistroDeCaixa $registroDeCaixa)
    {
        $this->caixaRepository->refletirAlteracaoCaixa($registroDeCaixa->caixa, $registroDeCaixa->valor);
    }
}
