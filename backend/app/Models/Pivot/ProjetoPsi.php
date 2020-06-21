<?php

namespace App\Models\Pivot;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ProjetoPsi extends Pivot
{
    protected $hidden = ['psi_id','nome_projeto','nome_psi'];

    protected $casts = ['areas_vagas' => 'array'];
}
