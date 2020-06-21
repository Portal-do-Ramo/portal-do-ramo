<?php

namespace App\Notifications\Psi;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PsiInscricaoDesinscricaoNotification extends Notification
{
    use Queueable;

    protected $inscricao, $acao;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($inscricao, $acao)
    {
        $this->inscricao = $inscricao;
        $this->acao = $acao;
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
            'titulo' => "Sua {$this->acao} foi realizada com sucesso!",
            'mensagem' => "Sua {$this->acao} no {$this->inscricao->psi->nome_psi} referente a área '{$this->inscricao->area_solicitada}' foi confirmada.",
            'link' => ""
        ];
    }
}
