<?php

namespace App\Notifications\Pedidos\PedidoDeDesligamento;

use App\Models\Pedidos\PedidoDeDesligamento;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeDesligamentoReprovadoNotification extends Notification
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
            'titulo' => 'Pedido de desligamento recusado',
            'mensagem' => "Caro {$notifiable->nome_completo}, infelizmente seu pedido de desligamento realizado no dia: {$this->pedidoDeDesligamento->data_criado->format('d/m/Y')} foi reprovado, entre em contato com o diretor de Gestão de Pessoas ou com a Presidência para que haja uma melhor negociação dos termos",
            'link' => 'meus-pedidos'
        ];
    }
}
