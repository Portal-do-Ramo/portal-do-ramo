<?php

namespace App\Notifications\Strike;

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
        return ['database'];
    }

    /**
     * Get the database representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        $condicao = $notifiable->is($this->reavaliacao->strike->membroAplicou) ? 'aplicou' : 'recebeu';
        
        return [
            'titulo' => 'Reavaliação do Strike',
            'mensagem' => "O strike que você $condicao, (aprovado no dia: {$this->reavaliacao->strike->data_aprovado}) foi reavaliado!",
            'link' => 'meus-strikes'
        ];
    }
}
