<?php

namespace App\Traits;

trait HasValorTotal
{
    protected static function bootHasValorTotal()
    {
        static::creating(function($model) {
            $model->dados_pedido += ['valor_total' => self::calcularValorTotal($model)];
        });

        static::updating(function($model) {
            $model->dados_pedido['valor_total'] = self::calcularValorTotal($model);
        });
    }

    private static function calcularValorTotal($model)
    {
        $valorPedidos = $model->dados_pedido['valor_frete'];

        foreach($model->dados_pedido['pedidos'] as $pedidos)
            $valorPedidos += $pedidos['valor_unitario'] * $pedidos['quantidade'];

        return $valorPedidos;
    }
}