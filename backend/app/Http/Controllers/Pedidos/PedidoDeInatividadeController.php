<?php

namespace App\Http\Controllers\Pedidos;

use App\Models\Pedidos\PedidoDeInatividade;
use App\Repositories\Interfaces\PedidoRepositoryInterface;
use Illuminate\Http\Request;

class PedidoDeInatividadeController extends AbstractPedidoController
{
    public function __construct(PedidoRepositoryInterface $pedidoRepository)
    {
        parent::__construct($pedidoRepository);
    }

    public function store(Request $request)
    {
        $dadosValidos = $request->validate(['justificativa' => 'required']);

        $this->pedidoRepository->criarPedidoDeInatividade($dadosValidos);
        return response()->json('Pedido de inatividade criado e enviado com sucesso', 201);
    }

    public function aprovar(PedidoDeInatividade $pedido)
    {
        $pedido->aprovar();
        return response()->json('Pedido de inatividade aprovado com sucesso', 200);
    }

    public function recusar(PedidoDeInatividade $pedido)
    {
        $pedido->recusar();
        return response()->json('Pedido de inatividade recusado com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'aprovar' => 'aprovarPessoas',
            'recusar' => 'recusarPessoas'
        ];
    }
}
