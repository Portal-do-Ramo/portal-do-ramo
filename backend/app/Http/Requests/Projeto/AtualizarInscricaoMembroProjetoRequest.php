<?php

namespace App\Http\Requests\Projeto;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AtualizarInscricaoMembroProjetoRequest extends FormRequest
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
            'funcao' => ['bail', 'required', Rule::in(['Membro', 'Líder', 'Assessor'])], 
            'area' => ['bail', 'present', 'nullable', Rule::in($this->route('projeto')->areas)]
        ];
    }

    public function attributes()
    {
        return [
            'funcao' => 'função',
            'area' => 'área'
        ];
    }
}
