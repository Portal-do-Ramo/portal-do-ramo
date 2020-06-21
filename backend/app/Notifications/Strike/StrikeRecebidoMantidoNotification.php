<?php

namespace App\Notifications\Strike;

use App\Models\Strike;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class StrikeRecebidoMantidoNotification extends Notification
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
            'titulo' => 'Strike mantido',
            'mensagem' => "Caro, {$notifiable->nome_completo}, gostaríamos de informar que o strike que você recebeu, aprovado dia {$this->strike->data_aprovado->format('d/m/Y')}, foi mantido",
            'link' => 'meus-strikes'
        ];
    }
}
