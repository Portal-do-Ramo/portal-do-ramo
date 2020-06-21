<?php

namespace App\Http\Controllers\Pedidos;

use App\Models\Pedidos\PedidoDeDesligamento;
use App\Repositories\Interfaces\PedidoRepositoryInterface;
use Illuminate\Http\Request;

class PedidoDeDesligamentoController extends AbstractPedidoController
{
    public function __construct(PedidoRepositoryInterface $pedidoRepository)
    {
        parent::__construct($pedidoRepository);
    }

    public function store(Request $request)
    {
        $dadosValidos = $request->validate(['justificativa' => 'required']);

        $this->pedidoRepository->criarPedidoDeDesligamento($dadosValidos);
        return response()->json('Pedido de desligamento criado e enviado com sucesso', 201);
    }

    public function aprovar(PedidoDeDesligamento $pedido)
    {
        $pedido->aprovar();
        return response()->json('Pedido de desligamento aprovado com sucesso', 200);
    }   

    public function recusar(PedidoDeDesligamento $pedido)
    {
        $pedido->recusar();
        return response()->json('Pedido de desligamento reprovado com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'aprovar' => 'aprovarPessoas',
            'recusar' => 'recusarPessoas'
        ];
    }
}
