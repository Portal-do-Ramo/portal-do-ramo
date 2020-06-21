<?php

namespace App\Notifications\Strike;

use App\Mail\Strike\ReavaliacaoCriadaMail;
use App\models\Reavaliacao;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class ReavaliacaoCriadaNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $reavaliacao;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Reavaliacao $reavaliacao)
    {
        $this->reavaliacao = $reavaliacao;
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
     * @return App\Mail\Reavaliacao\ReavaliacaoCriadaMail
     */
    public function toMail($notifiable)
    {
        return (new ReavaliacaoCriadaMail($notifiable, $this->reavaliacao))->to($notifiable->email);
    }

    /**
     * Get the database representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'titulo' => 'Reavaliação do Strike',
            'mensagem' => "Seu strike (aprovado no dia: {$this->reavaliacao->strike->data_aprovado}) foi reavaliado! Conclusão da reavaliação: '{$this->reavaliacao->constatacao}' ",
            'link' => 'meus-strikes'
        ];
    }
}
