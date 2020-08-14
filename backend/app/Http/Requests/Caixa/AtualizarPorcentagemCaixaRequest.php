<?php

namespace App\Http\Requests\Caixa;

use App\Rules\SomatorioPorcentagemOrcamento;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class AtualizarPorcentagemCaixaRequest extends FormRequest
{
    use ApiRequest;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'caixas' => ['required', 'array', new SomatorioPorcentagemOrcamento],
            'caixas.*.nome_caixa' => 'required|exists:caixas,nome_caixa_slug',
            'caixas.*.porcentagem_orcamento' => 'required'
        ];
    }
}
