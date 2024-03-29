<?php

namespace App\Repositories\Classes;

use App\Models\Pedidos\BasePedido;
use App\Models\Usuario;
use App\Models\UsuarioSistema;
use App\Models\WeakModels\Curso;
use App\Models\WeakModels\Hierarquia;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UsuarioRepository implements UsuarioRepositoryInterface
{
    public function index()
    {
        return Usuario::getQueryFormatada()
            ->rightJoin('situacoes', 'usuarios.situacao_id', '=', 'situacoes.id')
            ->addSelect('situacoes.nome as situacao')
            ->get()
            ->groupBy('situacao')
            ->map(fn($membros) => $membros->whereNotNull('matricula'));
    }

    public function indexMensagens()
    {
        return UsuarioSistema::getQueryFormatada()
            ->addSelect('email')
            ->with(['equipes:equipes.nome_equipe_slug', 'equipeCoordena:nome_equipe_slug,matricula_coordenador', 'equipesAssessora:nome_equipe_slug,matricula_assessor'])
            ->get()
            ->map(fn($usuario) => Arr::except($usuario->toArray(), ['equipes', 'equipe_coordena', 'equipes_assessora']) + ['equipes' => $usuario->equipes->merge($usuario->equipesAssessora)->push($usuario->equipeCoordena)->whereNotNull('nome_equipe_slug')->unique('nome_equipe_slug')->pluck('nome_equipe_slug')]);
    }

    public function searchUsuario()
    {
        return UsuarioSistema::getQueryFiltrada()->get();
    }

    public function getCursos()
    {
        return Curso::all();
    }

    public function getHierarquias()
    {
        return Hierarquia::all();
    }

    public function getListaPresenca()
    {
        return Usuario::whereHas('situacao', fn($query) => $query->whereNome('Ativo'))->select('nome_completo')->get();
    }

    public function getInativos()
    {
        $pedidosInatividade = BasePedido::where('tipo_pedido', 'pedido-de-inatividade')
            ->where('situacao', 'Aprovado')
            ->orderBy('data_aprovado', 'DESC')
            ->groupBy('matricula_membro_solicitou');

        return Usuario::select('matricula', 'nome_completo', 'email', 'data_fim_inatividade', 'pedidos.dados_pedido')
            ->whereHas('situacao', fn($query) => $query->whereNome('Inativo'))
            ->joinSub($pedidosInatividade, 'pedidos', fn($join) => $join->on('pedidos.matricula_membro_solicitou', '=','usuarios.matricula'))
            ->withCasts(['dados_pedido' => 'array'])
            ->get()
            ->map(fn($usuario) => [
                $usuario->nome_completo,
                $usuario->email,
                $usuario->dados_pedido['justificativa'],
                $usuario->data_fim_inatividade
            ]);
    }

    public function getDesligados()
    {
        $pedidosDesligamento = BasePedido::where('tipo_pedido', 'pedido-de-desligamento')
            ->where('situacao', 'Aprovado')
            ->orderBy('data_aprovado', 'DESC')
            ->groupBy('matricula_membro_solicitou');

        return Usuario::whereHas('situacao', fn($query) => $query->whereNome('Desligado'))
            ->select('matricula', 'nome_completo', 'email', 'data_desligado', 'membros.telefones', 'pedidos.dados_pedido')
            ->join('membros', 'usuarios.matricula', '=', 'membros.matricula_usuario')
            ->leftJoinSub($pedidosDesligamento, 'pedidos', fn($join) => $join->on('usuarios.matricula', '=', 'pedidos.matricula_membro_solicitou'))
            ->orderBy('data_desligado')
            ->withCasts(['telefones' => 'array', 'dados_pedidos' => 'array'])
            ->get()
            ->map(fn($usuario) => [
                $usuario->nome_completo,
                $usuario->email,
                $usuario->telefones['telefone_principal'],
                $usuario->dados_pedido ? $usuario->dados_pedido['justificativa'] : 'Acúmulo de 3 strikes',
                $usuario->data_desligado
            ]);
    }

    public function getPagantes()
    {
        return Usuario::select('matricula', 'nome_completo', 'email', 'situacoes.nome as situacao', 'membros.numero_ieee', 'membros.data_fim_membresia')
            ->join('situacoes', 'usuarios.situacao_id', '=', 'situacoes.id')
            ->join('membros', 'usuarios.matricula', '=', 'membros.matricula_usuario')
            ->where('membros.pagante', true)
            ->withCasts(['data_fim_membresia' => 'date:d/m/Y'])
            ->get();
    }
        
    public function minhasNotificacoes()
    {
        return Auth::user()
            ->notifications()
            ->select('id', 'data', 'read_at', 'created_at')
            ->whereDate('created_at', '>=', today()->subDays(30))
            ->get()
            ->map(fn($notificacao) => $notificacao->formatar());
    }

    public function create(array $dadosValidos)
    {
        DB::transaction(function () use ($dadosValidos) {
            $usuario = Usuario::create([
                'matricula' => $dadosValidos['matricula_usuario'],
                'senha' => 'i3ecefetrj',
                'nome_completo' => $dadosValidos['nome_completo'],
                'email' => $dadosValidos['email_usuario'],
                'hierarquia_id' => $dadosValidos['hierarquia_usuario'],
                'assessor' => $dadosValidos['assessor'],
                'marketing' => $dadosValidos['marketing'],
                'foto_url' => $dadosValidos['foto_url'] ?? 'https://image.flaticon.com/icons/png/512/306/306232.png'
            ]);
    
            $usuario->membro()->create([
                'data_nascimento' => $dadosValidos['data_nascimento'],
                'curso_id' => $dadosValidos['curso_usuario'],
                'telefones' => ['telefone_principal' => $dadosValidos['telefone_principal']]
            ]);    
        });
    }

    public function primeiroLogin(Usuario $usuario, array $dadosValidos)
    {
        DB::transaction(function () use ($usuario, $dadosValidos) {
            $usuario->update([
                'senha' => $dadosValidos['senha_usuario'],
                'ativo' => true
            ]);
    
            $usuario->membro->update([
                'cpf' => $dadosValidos['cpf_usuario'],
                'orgao_emissor' => $dadosValidos['orgao_emissor'],
                'rg' => $dadosValidos['rg_usuario'],
                'telefones->telefone_secundario' => $dadosValidos['telefone_secundario'],
                'tipo_sanguineo' => $dadosValidos['tipo_sanguineo'],
                'medicamentos_utiliza' => $dadosValidos['medicamentos_utiliza'],
                'medicamentos_alergico' => $dadosValidos['medicamentos_alergico'],
                'condicoes_especiais' => $dadosValidos['condicao_especial'],
                'alimentos_alergico' => $dadosValidos['alimentos_alergico'],
                'info_contato->nome' => $dadosValidos['nome_contato_emergencia'],
                'info_contato->grau_parentesco' => $dadosValidos['grau_parentesco_contato'], 
                'info_contato->telefone' => $dadosValidos['telefone_contato_emergencia']
            ]);            
        });
    }

    public function simpleUpdate(Usuario $usuario, array $dadosValidos)
    {
        DB::transaction(function () use ($usuario, $dadosValidos) {
            $usuario->update(['email' => $dadosValidos['email_usuario']]);
            
            $usuario->membro->update([
                'telefones' => ['telefone_principal' => $dadosValidos['telefone_principal'], 'telefone_secundario' => $dadosValidos['telefone_secundario']],
                'tipo_sanguineo' => $dadosValidos['tipo_sanguineo'],
                'medicamentos_utiliza' => $dadosValidos['medicamentos_utiliza'],
                'medicamentos_alergico' => $dadosValidos['medicamentos_alergico'],
                'condicoes_especiais' => $dadosValidos['condicao_especial'],
                'alimentos_alergico' => $dadosValidos['alimentos_alergico'],
                'info_contato->nome' => $dadosValidos['nome_contato_emergencia'], 
                'info_contato->grau_parentesco' =>  $dadosValidos['grau_parentesco_contato'], 
                'info_contato->telefone' => $dadosValidos['telefone_contato_emergencia']
            ]);
        });
    }

    public function updateFully(Usuario $usuario, array $dadosValidos)
    {
        DB::transaction(function () use ($usuario, $dadosValidos) {
            $usuario->update([
                'matricula' => $dadosValidos['matricula_usuario'],
                'hierarquia_id' => $dadosValidos['hierarquia_usuario'],
                'nome_completo' => $dadosValidos['nome_completo'],
                'email' => $dadosValidos['email_usuario'],
                'assessor' => $dadosValidos['assessor'],
                'marketing' => $dadosValidos['marketing']    
            ]);
    
            $usuario->membro->update([
                'cpf' => $dadosValidos['cpf_usuario'],
                'orgao_emissor' => $dadosValidos['orgao_emissor'],
                'rg' => $dadosValidos['rg_usuario'],
                'data_nascimento' => $dadosValidos['data_nascimento'],
                'curso_id' => $dadosValidos['curso_usuario'],
                'telefones' => ['telefone_principal' => $dadosValidos['telefone_principal'], 'telefone_secundario' => $dadosValidos['telefone_secundario']],
                'pagante' => $dadosValidos['pagante'],
                'numero_ieee' => $dadosValidos['numero_ieee'],
                'data_fim_membresia' => $dadosValidos['data_fim_membresia'],
                'cadastro_robocore' => $dadosValidos['cadastro_robocore'],
                'tipo_sanguineo' => $dadosValidos['tipo_sanguineo'],
                'medicamentos_utiliza' => $dadosValidos['medicamentos_utiliza'],
                'medicamentos_alergico' => $dadosValidos['medicamentos_alergico'],
                'condicoes_especiais' => $dadosValidos['condicao_especial'],
                'alimentos_alergico' => $dadosValidos['alimentos_alergico'],
                'info_contato->nome' => $dadosValidos['nome_contato_emergencia'], 
                'info_contato->grau_parentesco' =>  $dadosValidos['grau_parentesco_contato'], 
                'info_contato->telefone' => $dadosValidos['telefone_contato_emergencia'],
            ]);   
        });
    }

    public function setInativo(Usuario $usuario)
    {
        $usuario->update(['situacao_id' => 2, 'data_fim_inatividade' => today()->addMonths(6)->format('d/m/Y')]);
    }
    
    public function setDesligado(Usuario $usuario)
    {
        $usuario->update(['situacao_id' => 3, 'data_desligado' => today()->format('d/m/Y')]);
    }

    public function setFotoPerfil(Usuario $usuario, $url)
    {
        $usuario->update(['foto_url' => $url]);
    }

    public function setHierarquia(string $matricula, int $hierarquia = 1)
    {
        $usuario = Usuario::find($matricula);
        if($usuario->hierarquia_id < $hierarquia) $usuario->update(['hierarquia_id' => $hierarquia]);
    }
}
