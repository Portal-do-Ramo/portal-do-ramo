<?php

namespace App\Repositories\Classes;

use App\Models\Caixa;
use App\Models\RegistroDeCaixa;
use App\Repositories\Interfaces\RegistroDeCaixaRepositoryInterface;
use Illuminate\Support\Facades\DB;

class RegistroDeCaixaRepository implements RegistroDeCaixaRepositoryInterface
{
    public function index()
    {
        return RegistroDeCaixa::select('registros_de_caixa.uuid', 'registros_de_caixa.data', 'registros_de_caixa.valor', 'registros_de_caixa.exclusivo')
            ->leftJoin('caixas', 'registros_de_caixa.caixa_relacionado', '=', 'caixas.nome_caixa_slug')
            ->addSelect('caixas.nome_caixa_slug', 'caixas.nome_caixa')
            ->when(request('meses'), fn($query) => $query->whereDate('registros_de_caixa.data', '>=', today()->subMonths(request('meses'))))
            ->where(fn($subQuery) => $subQuery->where(fn($subQuery) => $subQuery->where('caixas.tipo_relacionado', 'Equipe')->where('caixas.emergencial_equipe', false))->orWhereNull('caixas.tipo_relacionado'))
            ->orderBy('data')
            ->get();
    }
    
    public function todosRegistrosAnuais()
    {
        $registrosEntrada = RegistroDeCaixa::selectRaw('ROUND(IFNULL(SUM(registros_de_caixa.valor), 0), 2) AS valor_total, meses.nome AS mes')->rightJoin('caixas', fn($join) => $join->on('registros_de_caixa.caixa_relacionado', '=', 'caixas.nome_caixa_slug')->where(fn($subQuery) => $subQuery->where(fn($subQuery) => $subQuery->where('caixas.tipo_relacionado', 'Equipe')->where('caixas.emergencial_equipe', false))->orWhereNull('caixas.tipo_relacionado')))->rightJoin('meses', fn($join) => $join->on(DB::raw('MONTH(registros_de_caixa.data)'), '=', 'meses.id')->where(DB::raw('YEAR(registros_de_caixa.data)'), request('ano'))->where('registros_de_caixa.tipo', 'Entrada'))->groupByRaw('meses.id')->get();
        $registrosSaida = RegistroDeCaixa::selectRaw('ROUND(ABS(IFNULL(SUM(registros_de_caixa.valor), 0)), 2) AS valor_total, meses.nome AS mes')->rightJoin('caixas', fn($join) => $join->on('registros_de_caixa.caixa_relacionado', '=', 'caixas.nome_caixa_slug')->where(fn($subQuery) => $subQuery->where(fn($subQuery) => $subQuery->where('caixas.tipo_relacionado', 'Equipe')->where('caixas.emergencial_equipe', false))->orWhereNull('caixas.tipo_relacionado')))->rightJoin('meses', fn($join) => $join->on(DB::raw('MONTH(registros_de_caixa.data)'), '=', 'meses.id')->where(DB::raw('YEAR(registros_de_caixa.data)'), request('ano'))->where('registros_de_caixa.tipo', 'Saída'))->groupByRaw('meses.id')->get();
        return ['entrada' => $registrosEntrada, 'saida' => $registrosSaida];
    }

    public function todosGastosAnuais()
    {
        $registros = collect();
        
        Caixa::equipesEspeciais()
            ->select('nome_caixa_slug', 'nome_caixa')
            ->leftJoin('equipes', 'caixas.id_relacionado', '=', 'equipes.nome_equipe_slug')
            ->addSelect('nome_equipe_slug', 'nome_equipe')
            ->get()
            ->each(function($item) use ($registros) {
                $registrosSaidaRelacionados = RegistroDeCaixa::selectRaw('ROUND(ABS(IFNULL(SUM(registros_de_caixa.valor), 0)), 2) AS valor_total, meses.nome AS mes')->rightJoin('meses', fn($join) => $join->on(DB::raw('MONTH(registros_de_caixa.data)'), '=', 'meses.id')->where('registros_de_caixa.caixa_relacionado', $item->nome_caixa_slug)->where(DB::raw('YEAR(registros_de_caixa.data)'), request('ano'))->where('registros_de_caixa.tipo', 'Saída'))->groupByRaw('meses.id')->get();
                $registros->push([$item->nome_equipe_slug ?? $item->nome_caixa_slug => $registrosSaidaRelacionados]);
            });
        
        return $registros;
    }

    public function fluxoAnual()
    {
        $registros = collect();
        
        Caixa::equipesEspeciais()
            ->select('nome_caixa_slug', 'nome_caixa')
            ->leftJoin('equipes', 'caixas.id_relacionado', '=', 'equipes.nome_equipe_slug')
            ->addSelect('nome_equipe_slug', 'nome_equipe')
            ->get()
            ->each(function($item) use ($registros) {
                $registrosEntradaRelacionados = RegistroDeCaixa::selectRaw('ROUND(IFNULL(SUM(registros_de_caixa.valor), 0), 2) AS valor_total, meses.nome AS mes')->rightJoin('meses', fn($join) => $join->on(DB::raw('MONTH(registros_de_caixa.data)'), '=', 'meses.id')->where('registros_de_caixa.caixa_relacionado', $item->nome_caixa_slug)->where(DB::raw('YEAR(registros_de_caixa.data)'), request('ano'))->where('registros_de_caixa.tipo', 'Entrada'))->groupByRaw('meses.id')->get();
                $registrosSaidaRelacionados = RegistroDeCaixa::selectRaw('ROUND(ABS(IFNULL(SUM(registros_de_caixa.valor), 0)), 2) AS valor_total, meses.nome AS mes')->rightJoin('meses', fn($join) => $join->on(DB::raw('MONTH(registros_de_caixa.data)'), '=', 'meses.id')->where('registros_de_caixa.caixa_relacionado', $item->nome_caixa_slug)->where(DB::raw('YEAR(registros_de_caixa.data)'), request('ano'))->where('registros_de_caixa.tipo', 'Saída'))->groupByRaw('meses.id')->get();
                $registros->push([$item->nome_equipe_slug ?? $item->nome_caixa_slug => ['entrada' => $registrosEntradaRelacionados, 'saida' => $registrosSaidaRelacionados]]);
            });
        
        return $registros;
    }

    public function gastosAnuaisEspecificos()
    {
        $equipes = ['wolfbotz', 'socialwolf'];

        return Caixa::select('nome_caixa_slug', 'nome_caixa')
            ->leftJoin('equipes', fn($join) => $join->on('caixas.id_relacionado', '=', 'equipes.nome_equipe_slug')->where('caixas.emergencial_equipe', true))
            ->addSelect('equipes.nome_equipe_slug', 'equipes.nome_equipe')
            ->leftJoin('projetos', 'caixas.id_relacionado', '=', 'projetos.nome_projeto_slug')
            ->addSelect('projetos.nome_projeto_slug', 'projetos.nome_projeto', 'projetos.nome_equipe AS nome_equipe_projeto')
            ->where(fn($query) => $query->whereIn('equipes.nome_equipe_slug', $equipes)->orWhereIn('projetos.nome_equipe', $equipes))
            ->get()
            ->groupBy(fn($item) => $item['nome_equipe_slug'] ?: $item['nome_equipe_projeto'])
            ->map(fn($item) => $item->map(fn($subItem) => [$subItem->nome_caixa_slug => RegistroDeCaixa::selectRaw('ROUND(ABS(IFNULL(SUM(registros_de_caixa.valor), 0)), 2) AS valor_total, meses.nome AS mes')->rightJoin('meses', fn($join) => $join->on(DB::raw('MONTH(registros_de_caixa.data)'), '=', 'meses.id')->where('registros_de_caixa.caixa_relacionado', $subItem->nome_caixa_slug)->where(DB::raw('YEAR(registros_de_caixa.data)'), request('ano'))->where('registros_de_caixa.tipo', 'Saída'))->groupByRaw('meses.id')->get()]));
    }

    public function getAnosRegistros()
    {
        return RegistroDeCaixa::selectRaw('YEAR(data) as ano')->groupBy('ano')->get()->pluck('ano');
    }

    public function processarRegistroExclusivo(RegistroDeCaixa $registroDeCaixa, Caixa $caixa)
    {
        DB::transaction(function () use ($registroDeCaixa, $caixa) {
            $caixa->increment('orcamento_atual', $registroDeCaixa->valor);

            if($caixa->tipo_relacionado === 'Projeto') {
                RegistroDeCaixa::createSubsequent($this->gerarDadosValidos($registroDeCaixa, $caixa->relacionado->equipe->caixaPrincipal->nome_caixa_slug));
            }
            else if($caixa->tipo_relacionado === 'Equipe') {
                if($caixa->emergencial_equipe) {
                    RegistroDeCaixa::createSubsequent($this->gerarDadosValidos($registroDeCaixa, $caixa->relacionado->caixaPrincipal->nome_caixa_slug));
                } else {
                    $caixaEmergencial = $caixa->relacionado->caixaEmergencial;
                    RegistroDeCaixa::createSubsequent($this->gerarDadosValidos($registroDeCaixa, $caixaEmergencial->nome_caixa_slug, $registroDeCaixa->valor * ($caixaEmergencial->porcentagem_orcamento / 100)));

                    $caixa->relacionado->projetosAtivos->each(function($projeto) use ($registroDeCaixa) {
                        $caixaProjeto = $projeto->caixa;            
                        RegistroDeCaixa::createSubsequent($this->gerarDadosValidos($registroDeCaixa, $caixaProjeto->nome_caixa_slug, $registroDeCaixa->valor * ($caixaProjeto->porcentagem_orcamento / 100)));
                    });
                }
            }

        });
    }

    public function processarRegistro(RegistroDeCaixa $registroDeCaixa)
    {
        DB::transaction(function () use ($registroDeCaixa) {
            Caixa::ativo()->equipesEspeciais()->where('porcentagem_orcamento', '>', 0)->get()->each(function($caixa) use ($registroDeCaixa) {
                $valorAtualizado =  $registroDeCaixa->valor * ($caixa->porcentagem_orcamento / 100);
                RegistroDeCaixa::createSubsequent($this->gerarDadosValidos($registroDeCaixa, $caixa->nome_caixa_slug, $valorAtualizado));

                if($caixa->id_relacionado !== null) {
                    $caixaEmergencial = $caixa->relacionado->caixaEmergencial;
                    RegistroDeCaixa::createSubsequent($this->gerarDadosValidos($registroDeCaixa, $caixaEmergencial->nome_caixa_slug, $valorAtualizado * ($caixaEmergencial->porcentagem_orcamento / 100)));

                    $caixa->relacionado->projetosAtivos->each(function($projeto) use ($registroDeCaixa, $valorAtualizado) {
                        $caixaProjeto = $projeto->caixa;            
                        RegistroDeCaixa::createSubsequent($this->gerarDadosValidos($registroDeCaixa, $caixaProjeto->nome_caixa_slug, $valorAtualizado * ($caixaProjeto->porcentagem_orcamento / 100)));
                    });
                }
            });
        });
    }

    private function gerarDadosValidos(RegistroDeCaixa $registroDeCaixa, string $caixaRelacionado, float $valor = null)
    {
        return [
            'data' => $registroDeCaixa->data->format('d/m/Y'),
            'valor' => $valor ?? $registroDeCaixa->valor,
            'exclusivo' => true,
            'caixa_relacionado' => $caixaRelacionado,
            'descricao' => $registroDeCaixa->descricao
        ];
    }
}