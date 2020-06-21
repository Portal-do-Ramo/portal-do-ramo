<?php

namespace App\Notifications\Falta;

use App\Models\Falta;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class FaltaCriadaNotification extends Notification
{
    use Queueable;
    
    protected $falta;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Falta $falta)
    {
        $this->falta = $falta;
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
            'titulo' => 'Nova falta registrada',
            'mensagem' => "Foi cadastrada uma nova falta sua, referente ao dia {$this->falta->data} devido a ausência a um(a) {$this->falta->tipo->nome}",
            'link' => 'minhas-faltas'
        ];
    }
}
