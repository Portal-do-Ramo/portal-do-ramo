<?php

use App\Models\WeakModels\TipoPedido;
use Illuminate\Database\Seeder;

class TipoPedidoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TipoPedido::create(['nome_tipo_pedido' => 'Pedido de desligamento', 'area' => 'Pessoas']);
        TipoPedido::create(['nome_tipo_pedido' => 'Pedido de inatividade', 'area' => 'Pessoas']);
        TipoPedido::create(['nome_tipo_pedido' => 'Pedido de saída de projeto', 'area' => 'Pessoas']);
        TipoPedido::create(['nome_tipo_pedido' => 'Pedido de compra', 'area' => 'Financeiro']);
        TipoPedido::create(['nome_tipo_pedido' => 'Pedido de reembolso', 'area' => 'Financeiro']);
    }
}
