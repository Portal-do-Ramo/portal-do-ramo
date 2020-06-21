<?php

namespace App\Notifications\Pedidos\PedidoDeSaidaDeProjeto;

use App\Models\Pedidos\PedidoDeSaidaDeProjeto;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeSaidaDeProjetoAprovadoNotification extends Notification
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
            'titulo' => 'Pedido saída de projeto aprovado',
            'mensagem' => "Caro {$notifiable->nome_completo}, seu pedido para saída do projeto \"{$this->pedidoDeSaidaDeProjeto->projetoSolicitado->nome_projeto}\" foi aprovado, lembrando que em seu pedido a data prevista para saída foi a seguinte: {$this->pedidoDeSaidaDeProjeto->data_saida}",
            'link' => 'meus-pedidos'
        ];
    }
}
