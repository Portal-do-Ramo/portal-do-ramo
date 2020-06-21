<?php

namespace App\Http\Controllers\Pedidos;

use App\Http\Controllers\ApiController;
use App\Models\Pedidos\BasePedido;
use App\Repositories\Interfaces\PedidoRepositoryInterface;

class AbstractPedidoController extends ApiController
{
    protected $pedidoRepository;

    public function __construct(PedidoRepositoryInterface $pedidoRepository)
    {
        parent::__construct();

        $this->pedidoRepository = $pedidoRepository;
        $this->authorizeResource(BasePedido::class, 'pedido');
    }
}
