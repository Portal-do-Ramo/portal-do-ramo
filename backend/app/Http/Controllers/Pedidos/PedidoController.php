<?php

namespace App\Http\Controllers\Pedidos;

use App\Http\Resources\HistoricoPedidosFinanceiroResource;
use App\Http\Resources\HistoricoPedidosPessoasResource;
use App\Models\Usuario;
use App\Repositories\Interfaces\PedidoRepositoryInterface;

class PedidoController extends AbstractPedidoController
{
    public function __construct(PedidoRepositoryInterface $pedidoRepository)
    {
        parent::__construct($pedidoRepository);
    }

    public function indexPessoas()
    {
        return $this->pedidoRepository->indexPessoas(); 
    }

    public function indexFinanceiro()
    {
        return $this->pedidoRepository->indexFinanceiro();
    }

    public function indexPessoasPendentes()
    {
        return $this->pedidoRepository->indexPessoasPendentes(); 
    }

    public function indexFinanceiroPendentes()
    {
        return $this->pedidoRepository->indexFinanceiroPendentes();
    }

    public function historicoPessoas(Usuario $usuario)
    {
        return new HistoricoPedidosPessoasResource($usuario, $this->pedidoRepository);
    }

    public function historicoFinanceiro(Usuario $usuario)
    {
        return new HistoricoPedidosFinanceiroResource($usuario, $this->pedidoRepository);
    }

    public function meusPedidos()
    {
        return $this->pedidoRepository->meusPedidos();
    }

    protected function resourceAbilityMap()
    {
        return [
            'indexPessoas' => 'viewAnyPessoas',
            'indexFinanceiro' => 'viewAnyFinanceiro',
            'indexPessoasPendentes' => 'viewAnyPessoas',
            'indexFinanceiroPendentes' => 'viewAnyFinanceiro',
            'historicoPessoas' => 'viewAnyPessoas',
            'historicoFinanceiro' => 'viewAnyFinanceiro'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return ['indexPessoas', 'indexFinanceiro', 'indexPessoasPendentes', 'indexFinanceiroPendentes', 'historicoPessoas', 'historicoFinanceiro'];
    }
}
