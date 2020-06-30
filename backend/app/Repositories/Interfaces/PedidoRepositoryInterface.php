<?php

namespace App\Repositories\Interfaces;

use App\Models\Pedidos\PedidoDeCompra;
use App\Models\Usuario;
use App\Models\UsuarioSistema;

interface PedidoRepositoryInterface
{
    public function indexPessoas();

    public function indexFinanceiro();
    
    public function indexPessoasPendentes();

    public function indexFinanceiroPendentes();

    public function historicoPessoas(Usuario $usuario);

    public function historicoFinanceiro(Usuario $usuario);

    public function meusPedidos();

    public function criarPedidoDeInatividade(array $dadosValidos);

    public function criarPedidoDeDesligamento(array $dadosValidos);

    public function criarPedidoDeSaidaDeProjeto(array $dadosValidos);

    public function criarPedidoDeReembolso(PedidoDeCompra $pedidoDeCompra, string $foto_url, UsuarioSistema $usuario);

    public function criarPedidoDeCompra(array $dadosValidos);
}