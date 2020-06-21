<?php

namespace App\Models\Pedidos;

class PedidoFinanceiro extends BasePedido
{
    public function getValorTotalAttribute()
    {
        return $this->dados_pedido['valor_total'];
    }
}
