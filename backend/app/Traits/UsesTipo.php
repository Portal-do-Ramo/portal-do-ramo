<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait UsesTipo
{
    protected static function bootUsesTipo()
    {
        static::creating(function($model) {
            $model->tipo_pedido = Str::snake(str_replace('App\Models\Pedidos\\', '', static::class), '-');
        });

        static::addGlobalScope('tipo', fn($query) => $query->whereTipoPedido(Str::snake(str_replace('App\Models\Pedidos\\', '', static::class), '-')));
    }
}