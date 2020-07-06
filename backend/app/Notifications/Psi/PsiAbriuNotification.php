<?php

namespace App\Notifications\Psi;

use App\Models\Psi;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PsiAbriuNotification extends Notification
{
    use Queueable;

    protected $psi, $mensagem;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Psi $psi)
    {
        $this->psi = $psi;

        if($this->psi->jaAbriu())
            $this->mensagem = "Abriu a PSI {$this->psi->nome_psi}!!! O Processo Seletivo Interno {$this->psi->nome_psi} começa hoje ({$this->psi->data_inicio->format('d/m/Y')}) e ficará aberto até o dia ({$this->psi->data_fim->format('d/m/Y')}), então corre lá e se inscreve para área que mais te interessa!";
        else
            $this->mensagem = "Atenção!!!
             O Processo Seletivo Interno {$this->psi->nome_psi} começará no dia ({$this->psi->data_inicio->format('d/m/Y')}) e ficará aberto até ({$this->psi->data_fim->format('d/m/Y')}), então se planeje e não esqueça de se inscrever para o cargo que mais tem a ver com você!   ;-)";
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
            'titulo' => "Processo Seletivo Interno {$this->psi->nome_psi}",
            'mensagem' => $this->mensagem,
            'link' => ""
        ];
    }
}
