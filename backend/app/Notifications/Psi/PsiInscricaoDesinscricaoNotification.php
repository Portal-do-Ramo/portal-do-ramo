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

        if($inscricao->tipo == 'projeto') //Projeto
        {
            $this->mensagem = "para participar do projeto {$this->inscricao->projeto->nome_projeto} na área: '{$this->inscricao->area_solicitada}', foi efetuada com sucesso.";
        }
        else if($inscricao->tipo == 'equipe') //Equipe
        {
            $this->mensagem = "para atuar como '{$this->inscricao->area_solicitada}' da equipe {$this->inscricao->equipe->nome_equipe} foi efetuada com sucesso.";
        }
        else //Gestão
        {
            $this->mensagem = "para o cargo de '{$this->inscricao->area_solicitada}' foi efetuada com sucesso.";
        }

        if($this->acao == 'inscrição')
            $this->mensagem = $this->mensagem.' Boa sorte!! :-)';
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
            'titulo' => "PSI {$this->inscricao->psi->nome_psi} - Sua {$this->acao} foi realizada com sucesso!",
            'mensagem' => "Sua {$this->acao} no Processo Seletivo Interno {$this->inscricao->psi->nome_psi} {$this->mensagem}",
            'link' => ""
        ];
    }
}
