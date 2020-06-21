<?php

namespace App\Observers\Pedidos;

use App\Models\Pedidos\PedidoDeSaidaDeProjeto;
use App\Models\UsuarioAtivo;
use App\Notifications\Pedidos\PedidoDeSaidaDeProjeto\PedidoDeSaidaDeProjetoAprovadoNotification;
use App\Notifications\Pedidos\PedidoDeSaidaDeProjeto\PedidoDeSaidaDeProjetoCriadoNotification;
use App\Notifications\Pedidos\PedidoDeSaidaDeProjeto\PedidoDeSaidaDeProjetoRecusadoNotification;
use Illuminate\Support\Facades\Notification;

class PedidoDeSaidaDeProjetoObserver
{
    /**
     * Handle the pedido saida projeto "created" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeSaidaDeProjeto  $pedidoDeSaidaDeProjeto
     * @return void
     */
    public function created(PedidoDeSaidaDeProjeto $pedidoDeSaidaDeProjeto)
    {
        Notification::send(UsuarioAtivo::presidenciaComDiretor('de Projetos'), new PedidoDeSaidaDeProjetoCriadoNotification($pedidoDeSaidaDeProjeto));
    }

    /**
     * Handle the pedido saida projeto "approved" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeSaidaDeProjeto  $pedidoDeSaidaDeProjeto
     * @return void
     */
    public function approved(PedidoDeSaidaDeProjeto $pedidoDeSaidaDeProjeto)
    {
        $pedidoDeSaidaDeProjeto->membroSolicitante->notify(new PedidoDeSaidaDeProjetoAprovadoNotification($pedidoDeSaidaDeProjeto));
    }

    /**
     * Handle the pedido saida projeto "refused" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeSaidaDeProjeto  $pedidoDeSaidaDeProjeto
     * @return void
     */
    public function refused(PedidoDeSaidaDeProjeto $pedidoDeSaidaDeProjeto)
    {
        $pedidoDeSaidaDeProjeto->membroSolicitante->notify(new PedidoDeSaidaDeProjetoRecusadoNotification($pedidoDeSaidaDeProjeto));
    }
}
