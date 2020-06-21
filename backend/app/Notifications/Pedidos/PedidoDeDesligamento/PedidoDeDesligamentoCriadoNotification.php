<?php

namespace App\Notifications\Pedidos\PedidoDeDesligamento;

use App\Models\Pedidos\PedidoDeDesligamento;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeDesligamentoCriadoNotification extends Notification
{
    use Queueable;

    protected $pedidoDeDesligamento;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(PedidoDeDesligamento $pedidoDeDesligamento)
    {
        $this->pedidoDeDesligamento = $pedidoDeDesligamento;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'titulo' => 'Pedido de desligamento solicitado',
            'mensagem' => "Foi solicitado pelo membro {$this->pedidoDeDesligamento->membroSolicitante->nome_completo}, um pedido de desligamento, sob a seguinte justificativa: \"{$this->pedidoDeDesligamento->justificativa}\"",
            'link' => 'gerenciar-pedidos-pessoas'
        ];
    }
}
