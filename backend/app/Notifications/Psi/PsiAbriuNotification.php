<?php

namespace App\Notifications\Psi;

use App\Mail\PsiAbriuMail;
use App\Models\Psi;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PsiAbriuNotification extends Notification
{
    use Queueable;

    protected $psi;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Psi $psi)
    {
        $this->psi = $psi;
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
            'titulo' => 'Processo Seletivo Interno',
            'mensagem' => "O {$this->psi->nome_psi} se inicia no dia ({$this->psi->data_inicio->format('d/m/Y')}) e ficará aberta até ({$this->psi->data_fim->format('d/m/Y')}), então escolha os projetos que mais lhe agrada e se inscreva!",
            'link' => ""
        ];
    }
}
