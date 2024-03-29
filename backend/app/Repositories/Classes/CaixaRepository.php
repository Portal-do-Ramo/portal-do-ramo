<?php

namespace App\Repositories\Classes;

use App\Models\Caixa;
use App\Models\Equipe;
use App\Models\RegistroDeCaixa;
use App\Repositories\Interfaces\CaixaRepositoryInterface;

class CaixaRepository implements CaixaRepositoryInterface
{
    public function index()
    {
        return Caixa::equipesEspeciais()
            ->select('caixas.nome_caixa_slug', 'caixas.nome_caixa', 'caixas.porcentagem_orcamento', 'caixas.orcamento_atual')
            ->with(['registrosDeCaixa' => fn($query) => $query->addSelect('registros_de_caixa.uuid', 'registros_de_caixa.valor', 'registros_de_caixa.data', 'registros_de_caixa.caixa_relacionado', 'registros_de_caixa.descricao')->whereDate('data', '>', today()->subYear())->orderBy('registros_de_caixa.data', 'DESC')])
            ->get();
    }

    public function indexPorcentagemEquipesEspecias()
    {
        return Caixa::equipesEspeciais()->select('caixas.nome_caixa_slug', 'caixas.nome_caixa', 'caixas.porcentagem_orcamento')->get();
    }

    public function indexPorcentagemProjetosEmergencial(Equipe $equipe)
    {
        return Caixa::select('caixas.nome_caixa_slug', 'caixas.nome_caixa', 'caixas.porcentagem_orcamento')
            ->leftJoin('projetos', 'projetos.nome_projeto_slug', '=', 'caixas.id_relacionado')
            ->where(fn($subQuery) => $subQuery->where('projetos.nome_equipe', $equipe->nome_equipe_slug)->orWhere(fn($subQuery) => $subQuery->whereNull('projetos.nome_equipe')->where('caixas.id_relacionado', $equipe->nome_equipe_slug)->where('caixas.emergencial_equipe', true)))
            ->where('caixas.ativo', true)
            ->get();    
    }

    public function infoGeralCaixa()
    {
        return Caixa::equipesEspeciais()
            ->selectRaw('ROUND(SUM(orcamento_atual), 2) as orcamento_total')
            ->addSelect(['total_entradas' => RegistroDeCaixa::selectRaw('ROUND(IFNULL(SUM(valor), 0), 2)')->join('caixas', fn($join) => $join->on('registros_de_caixa.caixa_relacionado', '=', 'caixas.nome_caixa_slug')->where(fn($query) => $query->where(fn($subQuery) => $subQuery->where('caixas.tipo_relacionado', 'Equipe')->where('caixas.emergencial_equipe', false))->orWhereNull('caixas.tipo_relacionado'))->whereRaw("DATE_FORMAT(registros_de_caixa.data, '%m/%Y') = DATE_FORMAT(CURRENT_DATE(), '%m/%Y')")->where('registros_de_caixa.tipo', 'Entrada'))])
            ->addSelect(['total_saidas' => RegistroDeCaixa::selectRaw('ROUND(IFNULL(SUM(valor), 0), 2)')->join('caixas', fn($join) => $join->on('registros_de_caixa.caixa_relacionado', '=', 'caixas.nome_caixa_slug')->where(fn($query) => $query->where(fn($subQuery) => $subQuery->where('caixas.tipo_relacionado', 'Equipe')->where('caixas.emergencial_equipe', false))->orWhereNull('caixas.tipo_relacionado'))->whereRaw("DATE_FORMAT(registros_de_caixa.data, '%m/%Y') = DATE_FORMAT(CURRENT_DATE(), '%m/%Y')")->where('registros_de_caixa.tipo', 'Saída'))])
            ->get();
    }

    public function updatePorcentagem(array $dadosValidos)
    {
        foreach($dadosValidos['caixas'] as $caixa)
            Caixa::where('nome_caixa_slug', $caixa['nome_caixa'])->update(['porcentagem_orcamento' => $caixa['porcentagem_orcamento']]);   
    }

    public function refletirAlteracaoCaixa(Caixa $caixa, float $valor)
    {
        $caixa->increment('orcamento_atual', $valor);
    }
}
