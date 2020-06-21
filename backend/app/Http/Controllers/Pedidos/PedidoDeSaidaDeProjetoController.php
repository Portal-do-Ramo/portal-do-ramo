<?php

namespace App\Http\Controllers\Pedidos;

use App\Models\Pedidos\PedidoDeSaidaDeProjeto;
use App\Repositories\Interfaces\PedidoRepositoryInterface;
use Illuminate\Http\Request;

class PedidoDeSaidaDeProjetoController extends AbstractPedidoController
{
    public function __construct(PedidoRepositoryInterface $pedidoRepository)
    {
        parent::__construct($pedidoRepository);
    }

    public function store(Request $request)
    {
        $dadosValidos = $request->validate(['data_saida' => 'bail|required|date_format:d/m/Y|after_or_equal:today', 'justificativa' => 'required', 'nome_projeto' => 'bail|required|exists:projetos,nome_projeto_slug']);
        
        $this->pedidoRepository->criarPedidoDeSaidaDeProjeto($dadosValidos);
        return response()->json('Pedido de saída de projeto criado e enviado com sucesso', 201);
    }

    public function aprovar(PedidoDeSaidaDeProjeto $pedido)
    {
        $pedido->aprovar();
        return response()->json('Pedido de saída de projeto aprovado com sucesso', 200);
    }

    public function recusar(PedidoDeSaidaDeProjeto $pedido)
    {
        $pedido->recusar();
        return response()->json('Pedido de saida de projeto recusado com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'aprovar' => 'aprovarPessoas',
            'recusar' => 'recusarPessoas'
        ];
    }
}
