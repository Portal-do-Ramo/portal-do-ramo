<?php

namespace App\Notifications\Pedidos\PedidoDeCompra;

use App\Models\Pedidos\PedidoDeCompra;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeCompraAprovadoNotification extends Notification
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
    public function toArray($notifiable)
    {
        return [
            'titulo' => 'Pedido de compra aprovado',
            'mensagem' => $this->pedidoDeCompra->projetoSolicitado ?  
                "Caro, {$notifiable->nome_completo}, gostaríamos de informar que foi aprovado seu pedido de compra de: {$this->pedidoDeCompra->quantidade}x {$this->pedidoDeCompra->produto}, destinado ao projeto {$this->pedidoDeCompra->projetoSolicitado->nome_projeto}, com valor total de R\$" . number_format($this->pedidoDeCompra->valorTotal, 2, ',', '.') :
                "Caro, {$notifiable->nome_completo}, gostaríamos de informar que foi aprovado seu pedido de compra de: {$this->pedidoDeCompra->quantidade}x {$this->pedidoDeCompra->produto}, com valor total de R\$" . number_format($this->pedidoDeCompra->valorTotal, 2, ',', '.'),
            'link' => 'meus-pedidos'
        ];
    }
}
