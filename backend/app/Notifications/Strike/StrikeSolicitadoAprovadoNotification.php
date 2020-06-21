<?php

namespace App\Notifications\Strike;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class StrikeSolicitadoAprovadoNotification extends Notification
{
    use Queueable;

    protected $strike;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($strike)
    {
        $this->strike = $strike;
    }

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
            'titulo' => 'Strike aprovado',
            'mensagem' => "Seu strike solicitado no dia {$this->strike->data_criado->format('d/m/Y')} contra o membro {$this->strike->membroRecebeu->nome_completo} foi aprovado",
            'link' => 'meus-strikes'
        ];
    }
}
