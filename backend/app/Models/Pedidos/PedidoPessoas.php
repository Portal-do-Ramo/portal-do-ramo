<?php

namespace App\Models\Pedidos;

class PedidoPessoas extends BasePedido
{
    public function getJustificativaAttribute()
    {
        return $this->dados_pedido['justificativa'];
    }
}
