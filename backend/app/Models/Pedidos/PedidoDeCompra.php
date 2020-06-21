<?php

namespace App\Models\Pedidos;

use App\Traits\HasValorTotal;
use App\Traits\UsesTipo;

class PedidoDeCompra extends PedidoFinanceiro
{
    use UsesTipo, HasValorTotal;
}
