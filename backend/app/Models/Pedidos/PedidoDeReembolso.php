<?php

namespace App\Models\Pedidos;

use App\Traits\HasValorTotal;
use App\Traits\UsesTipo;

class PedidoDeReembolso extends PedidoFinanceiro
{
    use UsesTipo, HasValorTotal;

    public function getDataPedidoCompraAttribute()
    {
        return $this->dados_pedido['data_pedido_compra'];
    }

    public function pedidoDeCompra()
    {
        return $this->belongsTo('App\Models\Pedidos\PedidoDeCompra', 'pedido_de_compra_relacionado', 'uuid');
    }
}
