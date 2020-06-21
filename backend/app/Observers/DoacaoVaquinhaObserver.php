<?php

namespace App\Observers;

use App\Models\DoacaoVaquinha;
use App\Notifications\Vaquinha\DoacaoVaquinhaRegistradaNotification;

class DoacaoVaquinhaObserver
{
    public function created(DoacaoVaquinha $doacaoVaquinha)
    {
        $doacaoVaquinha->usuario->notify(new DoacaoVaquinhaRegistradaNotification($doacaoVaquinha));
    }
}
