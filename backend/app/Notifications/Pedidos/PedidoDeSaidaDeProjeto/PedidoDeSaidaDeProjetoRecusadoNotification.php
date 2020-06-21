<?php

namespace App\Notifications\Pedidos\PedidoDeSaidaDeProjeto;

use App\Models\Pedidos\PedidoDeSaidaDeProjeto;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeSaidaDeProjetoRecusadoNotification extends Notification
{
    use Queueable;

    protected $pedidoDeSaidaDeProjeto;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(PedidoDeSaidaDeProjeto $pedidoDeSaidaDeProjeto)
    {
        $this->pedidoDeSaidaDeProjeto = $pedidoDeSaidaDeProjeto;
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
            'titulo' => 'Pedido de saída de projeto recusado',
            'mensagem' => "Caro {$notifiable->nome_completo}, infelizmente seu pedido para a saída do projeto: \"{$this->pedidoDeSaidaDeProjeto->projetoSolicitado->nome_projeto}\" foi recusado, contate o diretor de Gestão de Pessoas ou a Presidência ou o líder de seu projeto para que haja uma melhor negociação dos termos",
            'link' => 'meus-pedidos'
        ];
    }
}
