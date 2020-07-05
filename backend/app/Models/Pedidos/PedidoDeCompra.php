<?php

namespace App\Models\Pedidos;

use App\Traits\HasValorTotal;
use App\Traits\UsesTipo;

class PedidoDeCompra extends PedidoFinanceiro
{
    use UsesTipo, HasValorTotal;

    public function pedidosDeReembolso()
    {
        return $this->hasMany('App\Models\Pedidos\PedidoDeReembolso', 'pedido_de_compra_relacionado', 'uuid');
    }
}
