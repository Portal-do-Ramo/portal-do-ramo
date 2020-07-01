<?php

namespace App\Observers\Pedidos;

use App\Models\Pedidos\PedidoDeReembolso;
use App\Models\RegistroDeCaixa;
use App\Models\UsuarioAtivo;
use App\Notifications\Pedidos\PedidoDeReembolso\PedidoDeReembolsoAprovadoNotification;
use App\Notifications\Pedidos\PedidoDeReembolso\PedidoDeReembolsoReprovadoNotification;
use App\Notifications\Pedidos\PedidoDeReembolso\PedidoDeReembolsoSolicitadoNotification;
use Illuminate\Support\Facades\Notification;

class PedidoDeReembolsoObserver
{
    /**
     * Handle the pedido reembolso "created" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeReembolso  $pedidoDeReembolso
     * @return void
     */
    public function created(PedidoDeReembolso $pedidoDeReembolso)
    {
        Notification::send(UsuarioAtivo::presidenciaComDiretor('Financeiro'), new PedidoDeReembolsoSolicitadoNotification($pedidoDeReembolso));
    }

    /**
     * Handle the pedido reembolso "approved" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeReembolso  $pedidoDeReembolso
     * @return void
     */
    public function approved(PedidoDeReembolso $pedidoDeReembolso)
    {
        $pedidoDeReembolso->membroSolicitante->notify(new PedidoDeReembolsoAprovadoNotification($pedidoDeReembolso));
    }

    /**
     * Handle the pedido reembolso "refused" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeReembolso  $pedidoDeReembolso
     * @return void
     */
    public function refused(PedidoDeReembolso $pedidoDeReembolso)
    {
        $pedidoDeReembolso->membroSolicitante->notify(new PedidoDeReembolsoReprovadoNotification($pedidoDeReembolso));
    }
}
