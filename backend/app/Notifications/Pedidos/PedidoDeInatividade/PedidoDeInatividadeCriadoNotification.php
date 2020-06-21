<?php

namespace App\Notifications\Pedidos\PedidoDeInatividade;

use App\Models\Pedidos\PedidoDeInatividade;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeInatividadeCriadoNotification extends Notification
{
    use Queueable;

    protected $pedidoDeInatividade;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(PedidoDeInatividade $pedidoDeInatividade)
    {
        $this->pedidoDeInatividade = $pedidoDeInatividade;
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
            'titulo' => 'Pedido de inatividade solicitado',
            'mensagem' => "Foi solicitado um novo pedido de inatividade pelo membro {$this->pedidoDeInatividade->membroSolicitante->nome_completo}, sob a seguinte justificativa: \"{$this->pedidoDeInatividade->justificativa}\"",
            'link' => 'gerenciar-pedidos-pessoas'
        ];
    }
}
