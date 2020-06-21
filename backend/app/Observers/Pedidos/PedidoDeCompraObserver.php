<?php

namespace App\Observers\Pedidos;

use App\Models\Pedidos\PedidoDeCompra;
use App\Models\UsuarioAtivo;
use App\Notifications\Pedidos\PedidoDeCompra\PedidoDeCompraAprovadoNotification;
use App\Notifications\Pedidos\PedidoDeCompra\PedidoDeCompraRecusadoNotification;
use App\Notifications\Pedidos\PedidoDeCompra\PedidoDeCompraSolicitadoNotification;
use Illuminate\Support\Facades\Notification;

class PedidoDeCompraObserver
{
    /**
     * Handle the pedido compra "created" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeCompra  $pedidoDeCompra
     * @return void
     */
    public function created(PedidoDeCompra $pedidoDeCompra)
    {
        Notification::send(UsuarioAtivo::presidenciaComDiretor('Financeiro'), new PedidoDeCompraSolicitadoNotification($pedidoDeCompra));
    }

    /**
     * Handle the pedido compra "approved" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeCompra  $pedidoDeCompra
     * @return void
     */
    public function approved(PedidoDeCompra $pedidoDeCompra)
    {
        $pedidoDeCompra->membroSolicitante->notify(new PedidoDeCompraAprovadoNotification($pedidoDeCompra));
    }

    /**
     * Handle the pedido compra "refused" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeCompra  $pedidoDeCompra
     * @return void
     */
    public function refused(PedidoDeCompra $pedidoDeCompra)
    {
        $pedidoDeCompra->membroSolicitante->notify(new PedidoDeCompraRecusadoNotification($pedidoDeCompra));
    }
}
