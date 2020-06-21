<?php

namespace App\Models;

use App\Casts\DataFormatadaCast;
use App\Traits\UsesUuid;

class Reavaliacao extends BaseModel
{
    use UsesUuid;
    
    protected $table = 'reavaliacoes';

    protected $casts = ['data' => DataFormatadaCast::class];

    public function strike()
    {
        return $this->belongsTo('App\Models\Strike', 'strike_id', 'uuid');
    }
}
