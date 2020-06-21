<?php

namespace App\Observers\Pedidos;

use App\Jobs\EnviarEmailFimInatividade;
use App\Models\Pedidos\PedidoDeInatividade;
use App\Models\UsuarioAtivo;
use App\Notifications\Pedidos\PedidoDeInatividade\PedidoDeInatividadeAprovadoNotification;
use App\Notifications\Pedidos\PedidoDeInatividade\PedidoDeInatividadeCriadoNotification;
use App\Notifications\Pedidos\PedidoDeInatividade\PedidoDeInatividadeRecusadoNotification;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use Illuminate\Support\Facades\Notification;

class PedidoDeInatividadeObserver
{
    protected $usuarioRepository;

    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

    /**
     * Handle the pedido inatividade "created" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeInatividade  $pedidoDeInatividade
     * @return void
     */
    public function created(PedidoDeInatividade $pedidoDeInatividade)
    {
        Notification::send(UsuarioAtivo::presidenciaComDiretor('de Gestão de Pessoas'), new PedidoDeInatividadeCriadoNotification($pedidoDeInatividade));
    }

    /**
     * Handle the pedido inatividade "approved" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeInatividade  $pedidoDeInatividade
     * @return void
     */
    public function approved(PedidoDeInatividade $pedidoDeInatividade)
    {
        $pedidoDeInatividade->membroSolicitante->notify(new PedidoDeInatividadeAprovadoNotification($pedidoDeInatividade));
        $this->usuarioRepository->setInativo($pedidoDeInatividade->membroSolicitante);
        EnviarEmailFimInatividade::dispatch($pedidoDeInatividade->membroSolicitante)->onQueue('notificar-fim-inatividade')->delay(now()->addMonth(5));
    }

    /**
     * Handle the pedido inatividade "refused" event.
     *
     * @param  \App\Models\Pedidos\PedidoDeInatividade  $pedidoDeInatividade
     * @return void
     */
    public function refused(PedidoDeInatividade $pedidoDeInatividade)
    {
        $pedidoDeInatividade->membroSolicitante->notify(new PedidoDeInatividadeRecusadoNotification($pedidoDeInatividade));
    }
}
