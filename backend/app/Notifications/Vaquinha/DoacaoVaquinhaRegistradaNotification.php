<?php

namespace App\Notifications\Vaquinha;

use App\Models\DoacaoVaquinha;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DoacaoVaquinhaRegistradaNotification extends Notification
{
    use Queueable;

    protected $doacaoVaquinha;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(DoacaoVaquinha $doacaoVaquinha)
    {
        $this->doacaoVaquinha = $doacaoVaquinha;
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
            'titulo' => 'Doação para vaquinha registrada',
            'mensagem' => "Caro, {$notifiable->nome_completo}, sua doação para a vaquinha feita no dia: {$this->doacaoVaquinha->data}, com o valor de: R\${$this->doacaoVaquinha->valor} foi registrada",
            'link' => 'minhas-doacoes'
        ];
    }
}
