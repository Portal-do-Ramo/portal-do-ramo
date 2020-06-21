<?php

namespace App\Notifications\Pedidos\PedidoDeInatividade;

use App\Mail\Pedidos\PedidoDeInatividadeAprovadoMail;
use App\Models\Pedidos\PedidoDeInatividade;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class PedidoDeInatividadeAprovadoNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $pedidoDeInatividade;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(PedidoDeInatividade $pedidoDeInatividade)
    {
        $this->pedidoDeInatividade = $pedidoDeInatividade;
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
        return (new PedidoDeInatividadeAprovadoMail($this->pedidoDeInatividade))->to($notifiable->email);
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
            'titulo' => 'Pedido inatividade aprovado',
            'mensagem' => "Caro {$notifiable->nome_completo}, seu pedido de inatividade enviado dia {$this->pedidoDeInatividade->data_criado->format('d/m/Y')} foi aprovado, você agora se encontra no seu período de inatividade que encerrará dia {$notifiable->data_fim_inatividade}, caso deseje finalizá-lo antes do perído estipulado contate um dos membros da diretoria.",
            'link' => 'meus-pedidos'
        ];
    }
}
