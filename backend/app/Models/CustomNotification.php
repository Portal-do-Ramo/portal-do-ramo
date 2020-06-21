<?php

namespace App\Models;

use App\Events\Notificacoes\NotificacaoCriada;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Carbon;

class CustomNotification extends DatabaseNotification
{
    protected $dispatchesEvents = ['created' => NotificacaoCriada::class];
    
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }

    public function setTypeAttribute($value)
    {
        $value_arr = explode('\\', $value);
        $this->attributes['type'] = str_replace('Notification', '', $value_arr[count($value_arr) - 1]);
    }

    public function getTituloAttribute()
    {
        return $this->data['titulo'];
    }

    public function getMensagemAttribute()
    {
        return $this->data['mensagem'];
    }

    public function getLinkAttribute()
    {
        return $this->data['link'];
    }

    public function formatar()
    {
        return [
            'id' => $this->id,
            'titulo' => $this->titulo,
            'mensagem' => $this->mensagem,
            'link' => $this->link,
            'lida' => $this->read(),
            'data_criada' => $this->created_at
        ];
    }
}
