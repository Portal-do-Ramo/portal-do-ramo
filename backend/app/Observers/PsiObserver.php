<?php

namespace App\Observers;

use App\Models\Psi;
use App\Models\UsuarioSistema;
use App\Notifications\Psi\PsiAbriuNotification;
use Illuminate\Support\Facades\Notification;

class PsiObserver
{
    public function created(Psi $psi)
    {
        Notification::send(UsuarioSistema::all(), new PsiAbriuNotification($psi));
    }
}
