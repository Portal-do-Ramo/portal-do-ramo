<?php

namespace App\Models;

use App\Casts\DataFormatadaCast;
use App\Traits\UsesUuid;

class DoacaoVaquinha extends BaseModel
{
    use UsesUuid;

    protected $table = 'doacoes_vaquinhas';

    protected $casts = ['data' => DataFormatadaCast::class];

    public function usuario()
    {
        return $this->belongsTo('App\Models\Usuario', 'matricula_membro_doador', 'matricula');
    }

    public function vaquinha()
    {
        return $this->belongsTo('App\Models\Vaquinha', 'nome_vaquinha', 'nome_vaquinha_slug');
    }
}
