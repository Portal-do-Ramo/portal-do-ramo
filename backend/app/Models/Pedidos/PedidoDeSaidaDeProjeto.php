<?php

namespace App\Models\Pedidos;

use App\Traits\UsesTipo;

class PedidoDeSaidaDeProjeto extends PedidoPessoas
{
    use UsesTipo;
    
    public function getDataSaidaAttribute()
    {
        return $this->dados_pedido['data_prevista_saida'];
    }
}   
