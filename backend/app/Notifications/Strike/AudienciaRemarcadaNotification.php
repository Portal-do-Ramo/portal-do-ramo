<?php

namespace App\Notifications\Strike;

use App\Models\Strike;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;

class AudienciaRemarcadaNotification extends Notification
{
    use Queueable;

    protected $strike;
    protected $dataOriginal;
    protected $horaOriginal;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Strike $strike)
    {
        $this->strike = $strike;
        $this->dataOriginal = Carbon::parse($strike->getRawOriginal('data_audiencia'))->format('d/m/Y');
        $this->horaOriginal = $strike->getOriginal('data_audiencia');
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
            'titulo' => 'Audiência remarcada',
            'mensagem' => "Caros, foi remarcada a audiência prevista para o dia {$this->dataOriginal} as {$this->horaOriginal}, para o dia {$this->strike->data_audiencia->format('d/m/Y')} as {$this->strike->hora_audiencia}",
            'link' => (in_array($notifiable->matricula, [$this->strike->membro_recebeu, $this->strike->membro_aplicou])) ? 'meus-strikes' : ''
        ];
    }
}
