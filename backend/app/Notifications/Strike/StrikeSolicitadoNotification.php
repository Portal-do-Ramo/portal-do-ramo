<?php

namespace App\Notifications\Strike;

use App\Models\Strike;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class StrikeSolicitadoNotification extends Notification
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
            'titulo' => 'Novo strike solicitado',
            'mensagem' => "Foi solicitado um novo strike pelo membro {$this->strike->membroAplicou->nome_completo} contra o membro {$this->strike->membroRecebeu->nome_completo} com o determinado motivo: \"{$this->strike->motivo}\"",
            'link' => 'gerenciar-strikes'
        ];
    }
}