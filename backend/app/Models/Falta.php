<?php

namespace App\Models;

use App\Casts\DataFormatadaCast;
use App\Events\Falta\FaltaCriada;
use App\Traits\UsesUuid;

class Falta extends BaseModel
{
    use UsesUuid;
    
    protected $casts = ['data' => DataFormatadaCast::class];

    protected $dispatchesEvents = ['created' => FaltaCriada::class];

    public function scopeTipoFalta($query, $tipo)
    {
        return $query->whereHas('tipo', fn($query) => $query->whereNome($tipo));
    }

    public function scopeReferentes($query, $matricula)
    {
        return $query->whereMatriculaMembro($matricula);
    }

    /**
     * Definição da relação entre o modelo e o tipo de falta que ele representa
     *
     * @return \App\Models\TipoFalta
     */
    public function tipo()
    {
        return $this->belongsTo('App\Models\WeakModels\TipoFalta', 'tipo_id', 'id');
    }

    /**
     * Definição da relação entre a falta e o membro que a recebeu
     *
     * @return \App\Models\Usuario
     */
    public function usuario()
    {
        return $this->belongsTo('App\Models\Usuario' , 'matricula_membro', 'matricula');
    }
}
