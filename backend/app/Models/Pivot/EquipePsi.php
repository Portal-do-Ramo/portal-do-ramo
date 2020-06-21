<?php

namespace App\Models\Pivot;

use Illuminate\Database\Eloquent\Relations\Pivot;

class EquipePsi extends Pivot
{
    protected $hidden = ['psi_id','nome_equipe','nome_psi'];

    protected $casts = ['areas_vagas' => 'array'];
}
