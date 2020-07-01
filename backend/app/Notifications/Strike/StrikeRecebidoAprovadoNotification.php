<?php

namespace App\Notifications\Strike;

use App\Models\Strike;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class StrikeRecebidoAprovadoNotification extends Notification
{
    use Queueable;

    protected $strike;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Strike $strike)
    {
        $this->strike = $strike;
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
            'titulo' => 'Novo strike recebido',
            'mensagem' => "Caro $notifiable->nome_completo, foi aprovado um novo strike contra a sua pessoa, aplicado pelo membro: {$this->strike->membroAplicou->nome_completo}, pelo seguinte motivo: \"{$this->strike->motivo}\"",
            'link' => 'meus-strikes'
        ];
    }
}
