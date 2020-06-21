<?php

namespace App\Notifications\Psi;

use App\Mail\PsiInscricaoAvaliadaMail;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PsiInscricaoAvaliadaNotification extends Notification
{
    use Queueable;

    protected $inscricao, $mensagem;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($inscricao)
    {
        $this->inscricao = $inscricao;
        if($inscricao->tipo == 'projeto') //Projeto
        {
            $this->mensagem = "para participar do projeto {$this->inscricao->projeto->nome_projeto} na área: '{$this->inscricao->area_solicitada}'.";
        }
        else if($inscricao->tipo == 'equipe') //Equipe
        {
            $this->mensagem = "para atuar como '{$this->inscricao->area_solicitada}' da equipe {$this->inscricao->equipe->nome_equipe}.";
        }
        else //Gestão
        {
            $this->mensagem = "para o cargo de '{$this->inscricao->area_solicitada}'.";
        }
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
            'titulo' => "{$this->inscricao->psi->nome_psi} - Resposta",
            'mensagem' => "Você foi {$this->inscricao->condicao} {$this->mensagem}",
            'link' => ""
        ];
    }
}
