<?php

namespace App\Models;

class UsuarioAtivo extends Usuario
{
    protected $table = 'usuarios';

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('ativo', fn($query) => $query->whereHas('situacao', fn($query) => $query->whereNome('Ativo')));
    }

    public static function presidenciaComDiretor($area)
    {
        return self::whereHas('hierarquia', fn($query) => $query->whereIn('nome', ['Presidente', 'Vice-Presidente', "Diretor $area"]))->get();
    }

    public function scopeDiretoria($query)
    {
        return $query->whereHas('hierarquia', fn($query) => $query->whereDiretoria(true));
    }
}
