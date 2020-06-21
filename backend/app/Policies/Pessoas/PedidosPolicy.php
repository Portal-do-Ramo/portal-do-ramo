<?php

namespace App\Policies\Pessoas;

use App\Models\Pedidos\BasePedido;
use App\Models\Pedidos\PedidoDeCompra;
use App\Models\Pedidos\PedidoFinanceiro;
use App\Models\UsuarioSistema;
use Illuminate\Auth\Access\HandlesAuthorization;

class PedidosPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any base pedidos.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function viewAnyPessoas(UsuarioSistema $user)
    {
        return $user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas');
    }

    public function viewAnyFinanceiro(UsuarioSistema $user)
    {
        return $user->isPresidencia() or $user->isDiretor('Financeiro');
    }

    public function solicitarReembolso(UsuarioSistema $user, PedidoDeCompra $pedido)
    {
        return $pedido->situacao = 'Aprovado' and $pedido->valorTotal <= 80;
    }

    /**
     * Determine whether the user can update the base pedido.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Pedidos\BasePedido  $pedido
     * @return mixed
     */
    public function aprovarPessoas(UsuarioSistema $user, BasePedido $pedido)
    {
        return $pedido->situacao = 'Pendente' and ($user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas'));
    }

    /**
     * Determine whether the user can update the base pedido.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Pedidos\BasePedido  $pedido
     * @return mixed
     */
    public function aprovarFinanceiro(UsuarioSistema $user, BasePedido $pedido)
    {
        return $pedido->situacao = 'Pendente' and ($user->isPresidencia() or $user->isDiretor('Financeiro'));
    }

    /**
     * Determine whether the user can recusar the base pedido.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Pedidos\BasePedido  $pedido
     * @return mixed
     */
    public function recusarPessoas(UsuarioSistema $user, BasePedido $pedido)
    {
        return $pedido->situacao = 'Pendente' and $user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas');
    }
    
    /**
     * Determine whether the user can recusar the base pedido.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Pedidos\BasePedido  $pedido
     * @return mixed
     */
    public function recusarFinanceiro(UsuarioSistema $user, BasePedido $pedido)
    {
        return $pedido->situacao = 'Pendente' and $user->isPresidencia() or $user->isDiretor('Financeiro');
    }
}
