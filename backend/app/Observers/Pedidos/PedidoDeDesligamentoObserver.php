<?php

namespace App\Observers\Pedidos;

use App\Mail\Pedidos\PedidoDeDesligamentoAprovadoMail;
use App\Models\Pedidos\PedidoDeDesligamento;
use App\Models\UsuarioAtivo;
use App\Notifications\Pedidos\PedidoDeDesligamento\PedidoDeDesligamentoCriadoNotification;
use App\Notifications\Pedidos\PedidoDeDesligamento\PedidoDeDesligamentoReprovadoNotification;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class PedidoDeDesligamentoObserver
{
    protected $usuarioRepository;

    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

    /**
     * Handle the pedido desligamento "created" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeDesligamento  $pedidoDeDesligamento
     * @return void
     */
    public function created(PedidoDeDesligamento $pedidoDeDesligamento)
    {
        Notification::send(UsuarioAtivo::presidenciaComDiretor('de Gestão de Pessoas'), new PedidoDeDesligamentoCriadoNotification($pedidoDeDesligamento));
    }

    /**
     * Handle the pedido desligamento "approved" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeDesligamento  $pedidoDeDesligamento
     * @return void
     */
    public function approved(PedidoDeDesligamento $pedidoDeDesligamento)
    {
        Mail::to($pedidoDeDesligamento->membroSolicitante->email)->queue(new PedidoDeDesligamentoAprovadoMail($pedidoDeDesligamento->membroSolicitante, $pedidoDeDesligamento));
        $this->usuarioRepository->setDesligado($pedidoDeDesligamento->membroSolicitante);
    }

    /**
     * Handle the pedido desligamento "refused" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeDesligamento  $pedidoDeDesligamento
     * @return void
     */
    public function refused(PedidoDeDesligamento $pedidoDeDesligamento)
    {
        $pedidoDeDesligamento->membroSolicitante->notify(new PedidoDeDesligamentoReprovadoNotification($pedidoDeDesligamento));
    }
}
