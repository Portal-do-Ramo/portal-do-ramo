<?php

namespace App\Notifications\Strike;

use App\Models\Strike;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class StrikeAprovadoDiretoriaNotification extends Notification
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
            'titulo' => 'Novo strike aprovado',
            'mensagem' => "Caros, foi aprovado um strike contra o membro {$this->strike->membroRecebeu->nome_completo}, tendo esse sido solicitado pelo membro {$this->strike->membroAplicou->nome_completo}, no dia {$this->strike->data_criado->format('d/m/Y')}",
            'link' => ''
        ];
    }
}
