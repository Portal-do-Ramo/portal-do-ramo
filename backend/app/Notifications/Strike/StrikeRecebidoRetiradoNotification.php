<?php

namespace App\Notifications\Strike;

use App\Models\Strike;
use App\Mail\Strike\StrikeRemovidoMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class StrikeRecebidoRetiradoNotification extends Notification implements ShouldQueue
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
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new StrikeRemovidoMail($notifiable, $this->strike))->to($notifiable->email);
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
            'mensagem' => "O strike aprovado no dia {$this->strike->data_aprovado->format('d/m/Y')} foi removido.",
            'link' => 'meus-strikes'
        ];
    }
}
