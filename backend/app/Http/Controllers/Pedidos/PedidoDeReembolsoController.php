<?php

namespace App\Http\Controllers\Pedidos;

use App\Http\Requests\Pedido\CriarPedidoDeReembolsoRequest;
use App\Jobs\CriarPedidoDeReembolsoJob;
use App\Models\Pedidos\PedidoDeCompra;
use App\Models\Pedidos\PedidoDeReembolso;
use App\Repositories\Interfaces\PedidoRepositoryInterface;
use App\Services\VerificarExistenciaDiretorioService;

class PedidoDeReembolsoController extends AbstractPedidoController
{
    public function __construct(PedidoRepositoryInterface $pedidoRepository)
    {
        parent::__construct($pedidoRepository);    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pedidos\PedidoDeCompra  $pedido
     * @return \Illuminate\Http\Response
     */
    public function store(CriarPedidoDeReembolsoRequest $request, PedidoDeCompra $pedido, VerificarExistenciaDiretorioService $service)
    {
        CriarPedidoDeReembolsoJob::dispatch($pedido, $request->validated(), $this->pedidoRepository, $service);
        return response()->json('Pedido de reembolso criado e enviado com sucesso', 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pedidos\PedidoDeReembolso  $pedido
     * @return \Illuminate\Http\Response
     */
    public function aprovar(PedidoDeReembolso $pedido)
    {
        $pedido->aprovar();
        return response()->json('Pedido de reembolso aprovado com sucesso', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pedidos\PedidoDeReembolso  $pedido
     * @return \Illuminate\Http\Response
     */
    public function recusar(PedidoDeReembolso $pedido)
    {
        $pedido->recusar();
        return response()->json('Pedido de reembolso recusado com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'store' => 'solicitarReembolso',
            'aprovar' => 'aprovarFinanceiro',
            'recusar' => 'recusarFinanceiro'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return [];
    }
}
