<?php

namespace App\Notifications\Strike;

use App\Models\Strike;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class AudienciaMarcadaNotification extends Notification
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
            'titulo' => 'Audiência marcada',
            'mensagem' => "Foi marcada a audiência solicitada pelo membro {$this->strike->membroRecebeu->nome_completo} para o strike aplicado pelo membro {$this->strike->membroAplicou->nome_completo}, para o dia {$this->strike->data_audiencia->format('d/m/Y')} as {$this->strike->hora_audiencia}",
            'link' => (in_array($notifiable->matricula, [$this->strike->membro_recebeu, $this->strike->membro_aplicou])) ? 'meus-strikes' : ''
        ];
    }
}
