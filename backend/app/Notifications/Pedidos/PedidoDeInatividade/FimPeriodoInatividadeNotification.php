<?php

namespace App\Notifications\Pedidos\PedidoDeInatividade;

use App\Mail\Pedidos\FimInatividadeMail;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class FimPeriodoInatividadeNotification extends Notification
{
    use Queueable;

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return $notifiable->situacao->nome != 'Inativo' ? [] : ['mail', 'database']; 
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new FimInatividadeMail($notifiable))->to($notifiable->email);
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
            'titulo' => 'Fim do período de inatividade',
            'mensagem' => $notifiable->membro->pagante ?
                "Caro, $notifiable->nome_completo, viemos por meio deste notificar que seu perído de inatividade está acabando, lembrando que você, por ser pagante, não precisa se inscrever no próximo Processo Interno para continuar vinculado ao Ramo" :
                "Caro, $notifiable->nome_completo, viemos por meio desta, notificar que o seu período de inatividade está acabando, lembrando que você, por não ser pagante, deve se inscrever no próximo Processo Interno para continuar exercendo suas atividades pelo Ramo",
            'link' => 'meus-pedidos'
        ];
    }
}
