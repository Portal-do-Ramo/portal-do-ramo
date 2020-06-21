<?php

namespace App\Notifications\Pedidos\PedidoDeSaidaDeProjeto;

use App\Models\Pedidos\PedidoDeSaidaDeProjeto;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoDeSaidaDeProjetoCriadoNotification extends Notification
{
    use Queueable;

    protected $pedidoDeSaidaDeProjeto;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(PedidoDeSaidaDeProjeto $pedidoDeSaidaDeProjeto)
    {
        $this->pedidoDeSaidaDeProjeto = $pedidoDeSaidaDeProjeto;
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
            'titulo' => 'Novo pedido de saída de projeto solicitado',
            'mensagem' => "Foi solicitado pelo membro {$this->pedidoDeSaidaDeProjeto->membroSolicitante->nome_completo} a saída do projeto: {$this->pedidoDeSaidaDeProjeto->projetoSolicitado->nome_projeto}, sendo a data prevista para tal a seguinte: {$this->pedidoDeSaidaDeProjeto->data_saida}, sob a seguinte justificativa: \"{$this->pedidoDeSaidaDeProjeto->justificativa}\"",
            'link' => 'gerenciar-pedidos-pessoas'
        ];
    }
}
