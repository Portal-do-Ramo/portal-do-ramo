<?php

namespace App\Repositories\Classes;

use App\Models\Pedidos\BasePedido;
use App\Models\Pedidos\PedidoDeCompra;
use App\Models\Pedidos\PedidoDeDesligamento;
use App\Models\Pedidos\PedidoDeInatividade;
use App\Models\Pedidos\PedidoDeReembolso;
use App\Models\Pedidos\PedidoDeSaidaDeProjeto;
use App\Models\Usuario;
use App\Models\UsuarioSistema;
use App\Repositories\Interfaces\PedidoRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class PedidoRepository implements PedidoRepositoryInterface
{
    public function indexPessoas()
    {
        return BasePedido::select('pedidos.uuid', 'pedidos.dados_pedido', 'pedidos.situacao', 'pedidos.data_aprovado', 'pedidos.data_criado')
            ->rightJoin('tipo_pedidos', 'pedidos.tipo_pedido', '=', 'tipo_pedidos.nome_tipo_pedido_slug')
            ->addSelect('tipo_pedidos.nome_tipo_pedido_slug as tipo_pedido', 'tipo_pedidos.nome_tipo_pedido as nome_tipo')
            ->leftJoin('usuarios', 'pedidos.matricula_membro_solicitou', '=', 'usuarios.matricula')
            ->addSelect('usuarios.matricula as matricula_membro_solcitou', 'usuarios.nome_completo as nome_membro_solicitou')
            ->leftJoin('hierarquias', 'usuarios.hierarquia_id', '=', 'hierarquias.id')
            ->addSelect('hierarquias.nome as hierarquia_membro_solicitou')
            ->leftJoin('projetos', 'pedidos.nome_projeto_solicitado', '=', 'projetos.nome_projeto_slug')
            ->addSelect('projetos.nome_projeto_slug as nome_projeto_solicitado_slug', 'projetos.nome_projeto as nome_projeto_solicitado')
            ->where('tipo_pedidos.area', 'Pessoas')
            ->get()
            ->groupBy(fn($item) => str_replace('-', '_', $item['tipo_pedido']))
            ->map(fn($pedidos) => $pedidos->whereNotNull('uuid'));
    }

    public function indexFinanceiro()
    {
        return BasePedido::select('pedidos.uuid', 'pedidos.dados_pedido', 'pedidos.situacao', 'pedidos.data_aprovado', 'pedidos.data_criado')
            ->rightJoin('tipo_pedidos', 'pedidos.tipo_pedido', '=', 'tipo_pedidos.nome_tipo_pedido_slug')
            ->addSelect('tipo_pedidos.nome_tipo_pedido_slug as tipo_pedido', 'tipo_pedidos.nome_tipo_pedido as nome_tipo')
            ->leftJoin('usuarios', 'pedidos.matricula_membro_solicitou', '=', 'usuarios.matricula')
            ->addSelect('usuarios.matricula as matricula_membro_solicitou', 'usuarios.nome_completo as nome_membro_solicitou')
            ->leftJoin('hierarquias', 'usuarios.hierarquia_id', '=', 'hierarquias.id')
            ->addSelect('hierarquias.nome as hierarquia_membro_solicitou')
            ->leftJoin('projetos', 'pedidos.nome_projeto_solicitado', '=', 'projetos.nome_projeto_slug')
            ->addSelect('projetos.nome_projeto_slug as nome_projeto_solicitado_slug', 'projetos.nome_projeto as nome_projeto_solicitado')
            ->where('tipo_pedidos.area', 'Financeiro')
            ->get()
            ->groupBy(fn($item) => str_replace('-', '_', $item['tipo_pedido']))
            ->map(fn($pedidos) => $pedidos->whereNotNull('uuid'));
    }
    
    public function indexPessoasPendentes()
    {
        return BasePedido::select('pedidos.uuid', 'pedidos.dados_pedido', 'pedidos.data_aprovado', 'pedidos.situacao', 'pedidos.data_criado')
            ->rightJoin('tipo_pedidos', fn($join) => $join->on('pedidos.tipo_pedido', '=', 'tipo_pedidos.nome_tipo_pedido_slug')->where(fn($query) => $query->where('pedidos.situacao', 'Pendente')->orWhereNull('pedidos.situacao')))
            ->addSelect('tipo_pedidos.nome_tipo_pedido_slug as tipo_pedido', 'tipo_pedidos.nome_tipo_pedido as nome_tipo')
            ->leftJoin('usuarios', 'pedidos.matricula_membro_solicitou', '=', 'usuarios.matricula')
            ->addSelect('usuarios.matricula as matricula_membro_solcitou', 'usuarios.nome_completo as nome_membro_solicitou')
            ->leftJoin('hierarquias', 'usuarios.hierarquia_id', '=', 'hierarquias.id')
            ->addSelect('hierarquias.nome as hierarquia_membro_solicitou')
            ->leftJoin('projetos', 'pedidos.nome_projeto_solicitado', '=', 'projetos.nome_projeto_slug')
            ->addSelect('projetos.nome_projeto_slug as nome_projeto_solicitado_slug', 'projetos.nome_projeto as nome_projeto_solicitado')
            ->where('tipo_pedidos.area', 'Pessoas')
            ->get()
            ->groupBy(fn($item) => str_replace('-', '_', $item['tipo_pedido']))
            ->map(fn($pedidos) => $pedidos->whereNotNull('uuid'));
    }

    public function indexFinanceiroPendentes()
    {
        return BasePedido::select('pedidos.uuid', 'pedidos.dados_pedido', 'pedidos.data_aprovado', 'pedidos.situacao', 'pedidos.data_criado')
            ->rightJoin('tipo_pedidos', fn($join) => $join->on('pedidos.tipo_pedido', '=', 'tipo_pedidos.nome_tipo_pedido_slug')->where(fn($query) => $query->where('pedidos.situacao', 'Pendente')->orWhereNull('pedidos.situacao')))
            ->addSelect('tipo_pedidos.nome_tipo_pedido_slug as tipo_pedido', 'tipo_pedidos.nome_tipo_pedido as nome_tipo')
            ->leftJoin('usuarios', 'pedidos.matricula_membro_solicitou', '=', 'usuarios.matricula')
            ->addSelect('usuarios.matricula as matricula_membro_solicitou', 'usuarios.nome_completo as nome_membro_solicitou')
            ->leftJoin('hierarquias', 'usuarios.hierarquia_id', '=', 'hierarquias.id')
            ->addSelect('hierarquias.nome as hierarquia_membro_solicitou')
            ->leftJoin('projetos', 'pedidos.nome_projeto_solicitado', '=', 'projetos.nome_projeto_slug')
            ->addSelect('projetos.nome_projeto_slug as nome_projeto_solicitado_slug', 'projetos.nome_projeto as nome_projeto_solicitado')
            ->where('tipo_pedidos.area', 'Financeiro')
            ->get()
            ->groupBy(fn($item) => str_replace('-', '_', $item['tipo_pedido']))
            ->map(fn($pedidos) => $pedidos->whereNotNull('uuid'));
    }

    public function historicoPessoas(Usuario $usuario)
    {
        return BasePedido::select('pedidos.uuid', 'pedidos.dados_pedido', 'pedidos.situacao', 'pedidos.data_aprovado', 'pedidos.data_criado')
            ->rightJoin('tipo_pedidos', fn($join) => $join->on('pedidos.tipo_pedido', '=', 'tipo_pedidos.nome_tipo_pedido_slug')->where('pedidos.membro_solicitou', $usuario->matricula))
            ->rightJoin('tipo_pedidos', 'pedidos.tipo_pedido', '=', 'tipo_pedidos.nome_tipo_pedido_slug')
            ->addSelect('tipo_pedidos.nome_tipo_pedido_slug as tipo_pedido', 'tipo_pedidos.nome_tipo_pedido as nome_tipo')
            ->leftJoin('projetos', 'pedidos.nome_projeto_solicitado', '=', 'projetos.nome_projeto_slug')
            ->addSelect('projetos.nome_projeto_slug as nome_projeto_solicitado_slug', 'projetos.nome_projeto as nome_projeto_solicitado')
            ->where('tipo_pedidos.area', 'Pessoas')
            ->get()
            ->groupBy(fn($item) => str_replace('-', '_', $item['tipo_pedido']))
            ->map(fn($pedidos) => $pedidos->whereNotNull('uuid'));
    }

    public function historicoFinanceiro(Usuario $usuario)
    {
        return BasePedido::select('pedidos.uuid', 'pedidos.dados_pedido', 'pedidos.situacao', 'pedidos.data_aprovado', 'pedidos.data_criado')
            ->rightJoin('tipo_pedidos', fn($join) => $join->on('pedidos.tipo_pedido', '=', 'tipo_pedidos.nome_tipo_pedido_slug')->where('pedidos.membro_solicitou', $usuario->matricula))
            ->addSelect('tipo_pedidos.nome_tipo_pedido_slug as tipo_pedido', 'tipo_pedidos.nome_tipo_pedido as nome_tipo')
            ->leftJoin('projetos', 'pedidos.nome_projeto_solicitado', '=', 'projetos.nome_projeto_slug')
            ->addSelect('projetos.nome_projeto_slug as nome_projeto_solicitado_slug', 'projetos.nome_projeto as nome_projeto_solicitado')
            ->where('tipo_pedidos.area', 'Financeiro')
            ->get()
            ->groupBy(fn($item) => str_replace('-', '_', $item['tipo_pedido']))
            ->map(fn($pedidos) => $pedidos->whereNotNull('uuid'));
    }

    public function meusPedidos()
    {
        return BasePedido::select('pedidos.uuid', 'pedidos.dados_pedido', 'pedidos.situacao', 'pedidos.data_aprovado', 'pedidos.data_criado')
            ->when(request('situacao'), fn($query) => $query->rightJoin('tipo_pedidos', fn($join) => $join->on('pedidos.tipo_pedido', '=', 'tipo_pedidos.nome_tipo_pedido_slug')->where('pedidos.situacao', request('situacao'))->where('pedidos.matricula_membro_solicitou', Auth::id())), fn($query) => $query->rightJoin('tipo_pedidos', fn($join) => $join->on('pedidos.tipo_pedido', '=', 'tipo_pedidos.nome_tipo_pedido_slug')->where('pedidos.matricula_membro_solicitou', Auth::id())))
            ->addSelect('tipo_pedidos.nome_tipo_pedido_slug as tipo_pedido', 'tipo_pedidos.nome_tipo_pedido as nome_tipo')
            ->leftJoin('projetos', 'pedidos.nome_projeto_solicitado', '=', 'projetos.nome_projeto_slug')
            ->addSelect('projetos.nome_projeto_slug as nome_projeto_solicitado_slug', 'projetos.nome_projeto as nome_projeto_solicitado')
            ->when(request('tipo'), fn($query) => $query->where('tipo_pedidos.nome_tipo_pedido_slug', request('tipo')))
            ->get()
            ->groupBy(fn($item) => str_replace('-', '_', $item['tipo_pedido']))
            ->map(fn($pedidos) => $pedidos->whereNotNull('uuid'));
    }

    public function criarPedidoDeDesligamento(array $dadosValidos)
    {
        Auth::user()->pedidos()->save(new PedidoDeDesligamento(['dados_pedido' => ['justificativa' => $dadosValidos['justificativa']]]));
    }

    public function criarPedidoDeInatividade(array $dadosValidos)
    {
        Auth::user()->pedidos()->save(new PedidoDeInatividade(['dados_pedido' => ['justificativa' => $dadosValidos['justificativa']]]));
    }

    public function criarPedidoDeSaidaDeProjeto(array $dadosValidos)
    {
        Auth::user()->pedidos()->save(new PedidoDeSaidaDeProjeto(['dados_pedido' => ['data_prevista_saida' => $dadosValidos['data_saida'], 'justificativa' => $dadosValidos['justificativa']], 'nome_projeto_solicitado' => $dadosValidos['nome_projeto']]));
    }

    public function criarPedidoDeReembolso(PedidoDeCompra $pedidoDeCompra, string $foto_url, UsuarioSistema $usuario)
    {
        $usuario->pedidos()->save(new PedidoDeReembolso(['dados_pedido' => $pedidoDeCompra->dados_pedido + ['foto_comprovante' => $foto_url, 'data_pedido_compra' => $pedidoDeCompra->data_criado], 'nome_projeto_solicitado' => $pedidoDeCompra->nome_projeto_solicitado, 'pedido_de_compra_relacionado' => $pedidoDeCompra->uuid]));
    }

    public function criarPedidoDeCompra(array $dadosValidos)
    {
        Auth::user()->pedidos()->save(new PedidoDeCompra(['dados_pedido' => ['pedidos' => $dadosValidos['pedidos'], 'valor_frete' => $dadosValidos['valor_frete']], 'nome_projeto_solicitado' => $dadosValidos['nome_projeto']]));
    }
}