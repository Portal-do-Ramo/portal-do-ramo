<?php

namespace App\Models;

use App\Traits\UsesUuid;

class Parceria extends BaseModel
{
    use UsesUuid;

    protected $casts = ['equipes_beneficiadas' => 'array', 'consolidada' => 'boolean'];

    protected $observables = ['consolidated'];

    public function membroSugeriu()
    {
        return $this->belongsTo('App\Models\Usuario', 'membro_solicitou', 'matricula');
    }

    public function consolidar()
    {
        $this->update(['consolidada' => true]);
        $this->fireModelEvent('consolidated', false);
    }
}
