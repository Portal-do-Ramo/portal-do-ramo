<?php

namespace App\Notifications\Strike;

use App\Models\Strike;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class AudienciaSolicitadaNotification extends Notification 
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
            'titulo' => 'Solicitação de audiência',
            'mensagem' => "Foi solicitada uma audiência pelo membro: {$this->strike->membroRecebeu->nome_completo}, para o strike aprovado dia: {$this->strike->data_aprovado->format('d/m/Y')}",
            'link' => 'gerenciar-strikes'
        ];
    }
}
