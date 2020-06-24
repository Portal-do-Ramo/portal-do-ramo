<?php

namespace App\Http\Controllers\Pedidos;

use App\Http\Requests\Pedido\CriarAtualizarPedidoFinanceiroRequest;
use App\Models\Pedidos\PedidoDeCompra;
use App\Repositories\Interfaces\PedidoRepositoryInterface;

class PedidoDeCompraController extends AbstractPedidoController
{
    public function __construct(PedidoRepositoryInterface $pedidoRepository)
    {
        parent::__construct($pedidoRepository);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Requests\Pedido\CriarPedidoDeCompraRequest
     */
    public function store(CriarAtualizarPedidoFinanceiroRequest $request)
    {
        $this->pedidoRepository->criarPedidoDeCompra($request->validated());
        return response()->json('Pedido(s) de compra criado(s) e enviado(s) com sucesso', 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pedidos\PedidoDeCompra  $pedido
     * @return \Illuminate\Http\Response
     */
    public function aprovar(PedidoDeCompra $pedido)
    {
        $pedido->aprovar();
        return response()->json('Pedido de compra aprovado com sucesso', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pedidos\PedidoDeCompra  $pedido
     * @return \Illuminate\Http\Response
     */
    public function recusar(PedidoDeCompra $pedido)
    {
        $pedido->recusar();
        return response()->json('Pedido de compra reprovada com sucesso', 200);
    }
    
    protected function resourceAbilityMap()
    {
        return [
            'aprovar' => 'aprovarFinanceiro',
            'recusar' => 'recusarFinanceiro'
        ];
    }
}
