<?php

namespace App\Http\Requests\RegistroDeCaixa;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CriarRegistroDeCaixaRequest extends FormRequest
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
            'data' => 'required|date_format:d/m/Y|before_or_equal:today',
            'valor' => 'required|numeric',
            'exclusivo' => 'required|boolean',
            'caixa_relacionado' => ['present', 'nullable' , 'required_if:exclusivo,true', Rule::exists('caixas', 'nome_caixa_slug')->where('ativo', true)],
            'descricao' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'required_if' => 'O campo :attribute a que está direcionado deve estar preenchido quando o campo exclusivo for marcado',
            'before_or_equal' => 'O campo :attribute deve ser uma data anterior ou igual a hoje'
        ];
    }

    public function attributes()
    {
        return [
            'caixa_relacionado' => 'caixa a qual está direcionado',
            'descricao' => 'descrição'
        ];
    }
}
