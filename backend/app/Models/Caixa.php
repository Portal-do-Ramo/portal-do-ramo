<?php

namespace App\Models;

use App\Traits\UsesNomeSlug;

class Caixa extends BaseModel
{
    use UsesNomeSlug;

    protected $casts = [
        'ativo' => 'boolean',
        'emergencial_equipe' => 'boolean'
    ];
    
    public function relacionado()
    {
        return $this->morphTo(__FUNCTION__, 'tipo_relacionado', 'id_relacionado');
    }

    public function registrosDeCaixa()
    {
        return $this->hasMany('App\Models\RegistroDeCaixa', 'caixa_relacionado', 'nome_caixa_slug');
    }

    public function scopeAtivo($query)
    {
        return $query->where('caixas.ativo', true);
    }

    public function scopeEquipesEspeciais($query)
    {
        return $query->where(fn($query) => $query->whereTipoRelacionado('Equipe')->orWhereNull('tipo_relacionado'))->whereEmergencialEquipe(false)->where('caixas.ativo', true);
    }
}
