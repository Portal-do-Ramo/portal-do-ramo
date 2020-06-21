<?php

namespace App\Notifications\Pedidos\PedidoDeInatividade;

use App\Models\Pedidos\PedidoDeInatividade;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeInatividadeRecusadoNotification extends Notification
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
            'titulo' => 'Pedido de inatividade recusado',
            'mensagem' => "Caso {$notifiable->nome_completo}, seu pedido de inatividade solicitado no dia: {$this->pedidoDeInatividade->data_criado->format('d/m/Y')} foi infelizmente recusado, contate o diretor de Gestão de Pessoas ou a Presidência para que haja uma melhor negociação dos termos",
            'link' => 'meus-pedidos'
        ];
    }
}
