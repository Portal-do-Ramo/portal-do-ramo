<?php

namespace App\Notifications\Pedidos\PedidoDeCompra;

use App\Models\Pedidos\PedidoDeCompra;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeCompraSolicitadoNotification extends Notification
{
    use Queueable;

    protected $pedidoDeCompra;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(PedidoDeCompra $pedidoDeCompra)
    {
        $this->pedidoDeCompra = $pedidoDeCompra;
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
            'titulo' => 'Pedido de compra solicitado',
            'mensagem' => $this->pedidoDeCompra->projetoSolicitado ?
                "Foi solicitado pelo membro {$this->pedidoDeCompra->membroSolicitante->nome_completo}, destinado ao projeto {$this->pedidoDeCompra->projetoSolicitado->nome_projeto}, com um valor total de R\$" . number_format($this->pedidoDeCompra->valorTotal, 2, ',', '.') :
                "Foi solicitado pelo membro {$this->pedidoDeCompra->membroSolicitante->nome_completo}, com um valor total de R\$" . number_format($this->pedidoDeCompra->valorTotal, 2, ',', '.'),
            'link' => 'gerenciar-pedidos-financeiro',
        ];
    }
}
