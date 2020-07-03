<?php

namespace App\Notifications\Pedidos\PedidoDeCompra;

use App\Models\Pedidos\PedidoDeCompra;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeCompraRecusadoNotification extends Notification
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
            'titulo' => 'Pedido de compra recusado',
            'mensagem' => $this->pedidoDeCompra->projetoSolicitado ? 
                "Caro, {$notifiable->nome_completo}, gostariamos de informar que, infelizmente, foi recusado seu pedido de compra feito em: {$this->pedidoDeCompra->data_criado->format('d/m/Y')}, destinado ao projeto {$this->pedidoDeCompra->projetoSolicitado->nome_projeto}, com valor total de R\$" . number_format($this->pedidoDeCompra->valor_total, 2, ',', '.') :
                "Caro, {$notifiable->nome_completo}, gostariamos de informar que, infelizmente, foi recusado seu pedido de compra feito em: {$this->pedidoDeCompra->data_criado->format('d/m/Y')}, com valor total de R\$" . number_format($this->pedidoDeCompra->valor_total, 2, ',', '.'),
            'link' => 'meus-pedidos'
        ];
    }
}
