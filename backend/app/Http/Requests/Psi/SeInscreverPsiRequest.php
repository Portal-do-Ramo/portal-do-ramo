<?php

namespace App\Http\Requests\Psi;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class SeInscreverPsiRequest extends FormRequest
{
    use ApiRequest;

    public function rules()
    {
        return [
            'nome_psi' => 'bail|required|exists:psis,nome_psi_slug',
            'tipo' => 'required',
            'nome' => 'required_unless:tipo,gestão',
            'area' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um :attribute que não existe no sistema.'
        ];
    }

    public function attributes()
    {
        return [
            'nome_psi' => 'PSI',
            'area' => 'área'
        ];
    }
}
