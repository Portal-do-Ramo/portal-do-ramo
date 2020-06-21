<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Support\Carbon;

class Evento extends BaseModel
{
    use UsesUuid;
    
    protected $casts = ['evento_diretoria' => 'boolean'];

    public function relacionado()
    {
        return $this->morphTo(__FUNCTION__, 'tipo_relacionado', 'id_relacionado');
    }

    public function setDataEventoAttribute($value)
    {
        $this->attributes['data_evento'] = Carbon::createFromFormat('d/m/Y', $value);
    }
}
