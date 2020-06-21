<?php

namespace App\Repositories\Classes;

use App\Models\Caixa;
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

    public function infoGeralCaixa()
    {
        return Caixa::equipesEspeciais()
            ->selectRaw('SUM(orcamento_atual) as orcamento_total')
            ->addSelect(['total_entradas' => RegistroDeCaixa::selectRaw('IFNULL(SUM(valor), 0)')->join('caixas', fn($join) => $join->on('registros_de_caixa.caixa_relacionado', '=', 'caixas.nome_caixa_slug')->where(fn($query) => $query->where('caixas.tipo_relacionado', 'Equipe')->where('caixas.emergencial_equipe', false)->orWhereNull('caixas.tipo_relacionado'))->whereRaw("DATE_FORMAT(registros_de_caixa.data, '%m/%Y') = DATE_FORMAT(CURRENT_DATE(), '%m/%Y')")->where('registros_de_caixa.tipo', 'Entrada'))])
            ->addSelect(['total_saidas' => RegistroDeCaixa::selectRaw('IFNULL(SUM(valor), 0)')->join('caixas', fn($join) => $join->on('registros_de_caixa.caixa_relacionado', '=', 'caixas.nome_caixa_slug')->where(fn($query) => $query->where('caixas.tipo_relacionado', 'Equipe')->where('caixas.emergencial_equipe', false)->orWhereNull('caixas.tipo_relacionado'))->whereRaw("DATE_FORMAT(registros_de_caixa.data, '%m/%Y') = DATE_FORMAT(CURRENT_DATE(), '%m/%Y')")->where('registros_de_caixa.tipo', 'Saída'))])
            ->get();
    }

    public function updateManual(Caixa $caixa, array $dadosValidos)
    {
        $caixa->update(['porcentagem_orcamento' => $dadosValidos['porcentagem_orcamento'], 'orcamento_atual' => $dadosValidos['valor']]);
    }

    public function refletirAlteracaoCaixa(Caixa $caixa, float $valor)
    {
        $caixa->increment('orcamento_atual', $valor);
    }
}
