<?php

namespace App\Observers;

use App\Models\Strike;
use App\Models\UsuarioAtivo;
use App\Mail\Strike\AudienciaDesmarcadaMail;
use App\Mail\Strike\AudienciaMarcadaMail;
use App\Mail\Strike\AudienciaRemarcadaMail;
use App\Mail\Strike\StrikeRecebidoMail;
use App\Notifications\Strike\AudienciaRemarcadaNotification;
use App\Notifications\Strike\AudienciaDesmarcadaNotification;
use App\Notifications\Strike\AudienciaMarcadaNotification;
use App\Notifications\Strike\AudienciaSolicitadaNotification;
use App\Notifications\Strike\StrikeSolicitadoAprovadoNotification;
use App\Notifications\Strike\StrikeRecebidoAprovadoNotification;
use App\Notifications\Strike\StrikeRecebidoMantidoNotification;
use App\Notifications\Strike\StrikeRecebidoRetiradoNotification;
use App\Notifications\Strike\StrikeReprovadoNotification;
use App\Notifications\Strike\StrikeSolicitadoMantidoNotification;
use App\Notifications\Strike\StrikeSolicitadoNotification;
use App\Notifications\Strike\StrikeSolicitadoRetiradoNotification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class StrikeObserver
{
    public function approved(Strike $strike)
    {
        $membros = $this->getMembros($strike);

        $strike->membroRecebeu->notify(new StrikeRecebidoAprovadoNotification($strike));
        $strike->membroAplicou->notify(new StrikeSolicitadoAprovadoNotification($strike));

        Mail::to($membros->map(fn($item) => ['name' => $item->nome_completo, 'email' => $item->email]))->queue((new StrikeRecebidoMail($strike))->onQueue('strike-recebido'));
    }

    public function audienceRequested(Strike $strike)
    {
        Notification::send(UsuarioAtivo::presidenciaComDiretor('de Gestão de Pessoas'), new AudienciaSolicitadaNotification($strike));
    }

    public function audienceScheduled(Strike $strike)
    {
        $membros = $this->getMembros($strike);

        Notification::send($membros, new AudienciaMarcadaNotification($strike));
        Mail::to($membros->map(fn($item) => ['name' => $item->nome_completo, 'email' => $item->email]))->queue((new AudienciaMarcadaMail($strike))->onQueue('audiencia-strike-mail'));
    }

    public function audienceRescheduled(Strike $strike)
    {
        $membros = $this->getMembros($strike);

        Notification::send($membros, new AudienciaRemarcadaNotification($strike));
        Mail::to($membros->map(fn($item) => ['name' => $item->nome_completo, 'email' => $item->email]))->queue((new AudienciaRemarcadaMail($strike))->onQueue('audiencia-strike-mail'));
    }

    public function audienceRemoved(Strike $strike)
    {
        $membros = $this->getMembros($strike);

        Notification::send($membros, new AudienciaDesmarcadaNotification($strike));
        Mail::to($membros->map(fn($item) => ['name' => $item->nome_completo, 'email' => $item->email]))->queue((new AudienciaDesmarcadaMail($strike))->onQueue('audiencia-strike-mail'));
    }

    public function createdApproved(Strike $strike)
    {
        $membros = $this->getMembros($strike);

        $strike->membroRecebeu->notify(new StrikeRecebidoAprovadoNotification($strike));
        
        Mail::to($membros->map(fn($item) => ['name' => $item->nome_completo, 'email' => $item->email]))->queue((new StrikeRecebidoMail($strike))->onQueue('strike-recebido'));
    }

    public function createdNormal(Strike $strike)
    {
        Notification::send(UsuarioAtivo::presidenciaComDiretor('de Gestão de Pessoas'), new StrikeSolicitadoNotification($strike));
    }

    public function disapproved(Strike $strike)
    {
        $strike->membroAplicou->notify(new StrikeReprovadoNotification($strike));
    }

    public function removed(Strike $strike)
    {
        $strike->membroAplicou->notify(new StrikeSolicitadoRetiradoNotification($strike));
        $strike->membroRecebeu->notify(new StrikeRecebidoRetiradoNotification($strike));
    }

    public function sustained(Strike $strike)
    {
        $strike->membroAplicou->notify(new StrikeSolicitadoMantidoNotification($strike));
        $strike->membroRecebeu->notify(new StrikeRecebidoMantidoNotification($strike));
    }

    private function getMembros(Strike $strike)
    {
        return UsuarioAtivo::diretoria()->get()->merge([$strike->membroAplicou, $strike->membroRecebeu])->unique('matricula');
    }
}
