<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Support\Carbon;

class Feedback extends BaseModel
{
    use UsesUuid;

    protected $table = 'feedbacks';
        
    public function usuario()
    {
        $this->belongsTo('App\Models\Usuario', 'matricula', 'membro_enviou');
    }

    public function getDataCriadoAttribute($value)
    {
        return Carbon::createFromFormat('d/m/Y', $value)->diffForHumans();
    }
}
