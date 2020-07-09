<?php

namespace App\Notifications\Psi;

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
        $temp = "";

        if($inscricao->tipo == 'projeto') //Projeto
            $temp = "para participar do projeto {$this->inscricao->projeto->nome_projeto} na área: '{$this->inscricao->area_solicitada}'";

        else if($inscricao->tipo == 'equipe') //Equipe
            $temp =  "para atuar como '{$this->inscricao->area_solicitada}' da equipe {$this->inscricao->equipe->nome_equipe}";

        else //Gestão
            $temp =  "para o cargo de '{$this->inscricao->area_solicitada}'";

        if($this->inscricao->condicao == 'Aprovado') //Aprovado
            $this->mensagem = "Parabéns!!! Você foi aprovado ".$temp." :-)";
        else //Reprovado
            $this->mensagem = "Infelizmente você não foi aprovado ".$temp.". Mas não fique triste, você pode tentar de novo no próximo processo!! ;-)";
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
            'titulo' => "PSI {$this->inscricao->psi->nome_psi} - Resposta",
            'mensagem' => $this->mensagem,
            'link' => ""
        ];
    }
}
