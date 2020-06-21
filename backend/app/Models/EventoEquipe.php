<?php

namespace App\Models;

class EventoEquipe extends Evento
{
    protected $table = 'eventos';

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('relacionado', fn($query) => $query->whereTipoRelacionado('Equipe'));
    }
}
