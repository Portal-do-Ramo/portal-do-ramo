<?php

namespace App\Observers;

use App\Jobs\AbrirVaquinha;
use App\Jobs\FecharVaquinha;
use App\Models\Vaquinha;

class VaquinhaObserver
{
    public function created(Vaquinha $vaquinha)
    {
        AbrirVaquinha::dispatch($vaquinha)->onQueue('abrir-fechar-vaquinha')->delay($vaquinha->data_inicio);
        FecharVaquinha::dispatch($vaquinha)->onQueue('abrir-fechar-vaquinha')->delay($vaquinha->data_fim);
    }
}
