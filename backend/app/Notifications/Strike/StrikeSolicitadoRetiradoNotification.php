<?php

namespace App\Notifications\Strike;

use App\Models\Strike;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class StrikeSolicitadoRetiradoNotification extends Notification
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
            'titulo' => 'Strike retirado',
            'mensagem' => "Caro, {$notifiable->nome_completo}, seu strike solicitado contra o membro {$this->strike->membroRecebeu->nome_completo}, aprovado no dia {$this->strike->data_aprovado->format('d/m/Y')} foi retirado",
            'link' => 'meus-strikes'
        ];
    }
}
