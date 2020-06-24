<?php

namespace App\Notifications\Parceria;

use App\Models\Parceria;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class SugestaoDeParceriaSolicitadaNotification extends Notification
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
            'titulo' => 'Nova parceria solicitada',
            'mensagem' => "Caros, foi feita uma sugestão pelo membro {$this->parceria->membroSugeriu->nome_completo} para uma nova parceria com a empresa {$this->parceria->nome_empresa}, com os seguintes possíveis benefícios: {$this->parceria->beneficios}",
            'link' => 'gerenciar-parcerias'
        ];
    }
}
