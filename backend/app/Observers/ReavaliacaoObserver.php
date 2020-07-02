<?php

namespace App\Observers;

use App\Models\Reavaliacao;
use App\Notifications\Strike\ReavaliacaoCriadaNotification;
use Illuminate\Support\Facades\Notification;

class ReavaliacaoObserver
{
    /**
     * Handle the reavaliacao "created" event.
     *
     * @param  \App\Models\Reavaliacao  $reavaliacao
     * @return void
     */
    public function created(Reavaliacao $reavaliacao)
    {
        $strike = $reavaliacao->strike;

        Notification::send([$strike->membroRecebeu, $strike->membroAplicou], new ReavaliacaoCriadaNotification($reavaliacao));
        $strike->{strtolower($reavaliacao->constatacao)}();
    }
}
