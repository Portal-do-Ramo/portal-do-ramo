<?php

namespace App\Notifications\Parceria;

use App\Models\Parceria;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ParceriaConsolidadaNotification extends Notification
{
    use Queueable;

    protected $parceria;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Parceria $parceria)
    {
        $this->parceria = $parceria;
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
            'titulo' => 'Novar parceria consolidadas',
            'mensagem' => "Caros, viemos anunciar a consolidação de uma nova parceria com a {$this->parceria->nome_empresa}, tal parceria nos trará os seguintes benefícios: {$this->parceria->beneficios}, para mais detalhes acessem a página de parcerias!",
            'link' => 'parcerias'
        ];
    }
}
