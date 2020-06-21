<?php

namespace App\Notifications\Vaquinha;

use App\Models\Vaquinha;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NotificarVaquinhaAbertaNotification extends Notification
{
    use Queueable;

    protected $vaquinha;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Vaquinha $vaquinha)
    {
        $this->vaquinha = $vaquinha;
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
            'titulo' => 'Vaquinha aberta',
            'mensagem' => "Caros, temos uma nova vaquinha aberta, acabando dia: {$this->vaquinha->data_fim->format('d/m/Y')}, caso queira fazer uma doação, entre em contato com um dos assessores ou transfira para a conta presente no grupo do Whatsapp",
            'link' => ''
        ];
    }
}
