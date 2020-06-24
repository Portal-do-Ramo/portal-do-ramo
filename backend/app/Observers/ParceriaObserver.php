<?php

namespace App\Observers;

use App\Models\Parceria;
use App\Models\Usuario;
use App\Models\UsuarioAtivo;
use App\Notifications\Parceria\ParceriaConsolidadaNotification;
use App\Notifications\Parceria\SugestaoDeParceriaSolicitadaNotification;
use Illuminate\Support\Facades\Notification;

class ParceriaObserver
{
    /**
     * Handle the parceria "created" event.
     *
     * @param  \App\Models\Parceria  $parceria
     * @return void
     */
    public function created(Parceria $parceria)
    {
        if($parceria->consolidada) $this->consolidated($parceria);
        else Notification::send(UsuarioAtivo::whereMarketing(true)->get(), new SugestaoDeParceriaSolicitadaNotification($parceria));
    }

    public function consolidated(Parceria $parceria)
    {
        Notification::send(UsuarioAtivo::all(), new ParceriaConsolidadaNotification($parceria));
    }
}
