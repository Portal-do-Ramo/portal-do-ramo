<?php

namespace App\Notifications\Pedidos\PedidoDeReembolso;

use App\Models\Pedidos\PedidoDeReembolso;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeReembolsoReprovadoNotification extends Notification
{
    use Queueable;

    protected $pedidoDeReembolso;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(PedidoDeReembolso $pedidoDeReembolso)
    {
        $this->pedidoDeReembolso = $pedidoDeReembolso;
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
            'titulo' => 'Pedido de reembolso aprovado',
            'mensagem' => $this->pedidoDeReembolso->projetoSolicitado ? 
                "Caro, {$notifiable->nome_completo}, gostariamos de informar que, infelizmente, foi reprovado seu pedido de reembolso referente a seu pedido do dia {$this->pedidoDeReembolso->data_pedido}, direcionado ao projeto {$this->pedidoDeReembolso->projetoSolicitado->nome_projeto} com valor de R\$" . number_format($this->pedidoDeReembolso->valorTotal, 2, ',', '.') :
                "Caro, {$notifiable->nome_completo}, gostariamos de informar que, infelizmente, foi reprovado seu pedido de reembolso referente a seu pedido do dia {$this->pedidoDeReembolso->data_pedido}, com valor de R\$" . number_format($this->pedidoDeReembolso->valorTotal, 2, ',', '.'),
            'link' => 'meus-pedidos'
        ];
    }
}
