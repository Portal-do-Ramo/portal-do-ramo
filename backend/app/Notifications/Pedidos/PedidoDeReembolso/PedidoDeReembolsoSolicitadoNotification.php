<?php

namespace App\Notifications\Pedidos\PedidoDeReembolso;

use App\Models\Pedidos\PedidoDeReembolso;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeReembolsoSolicitadoNotification extends Notification
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
            'titulo' => 'Pedido de reembolso solicitado',
            'mensagem' => $this->pedidoDeReembolso->projetoSolicitado ?
                "Caros, foi solicitado pelo membro {$this->pedidoDeReembolso->membroSolicitante->nome_completo}, um novo pedido de reembolso referente a um pedido feito dia {$this->pedidoDeReembolso->data_pedido_compra}, direcionado ao projeto {$this->pedidoDeReembolso->projetoSolicitado->nome_projeto} com um valor de R\$" . number_format($this->pedidoDeReembolso->valorTotal, 2, ',', '.') :
                "Caros, foi solicitado pelo membro {$this->pedidoDeReembolso->membroSolicitante->nome_completo}, um novo pedido de reembolso referente a um pedido feito dia {$this->pedidoDeReembolso->data_pedido_compra}, com um valor de R\$" . number_format($this->pedidoDeReembolso->valorTotal, 2, ',', '.'),
            'link' => 'gerenciar-pedidos-financeiro'
        ];
    }
}
