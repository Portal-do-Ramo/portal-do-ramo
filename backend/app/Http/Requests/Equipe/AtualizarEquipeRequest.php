<?php

namespace App\Http\Requests\Equipe;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AtualizarEquipeRequest extends FormRequest
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
            'nome_equipe' => ['bail', 'required', Rule::unique('equipes')->ignore($this->route('equipe'))],
            'capitulo' => 'present|nullable'
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um usuário que não existe no sistema.'
        ];
    }

    public function attributes()
    {
        return [
            'nome_equipe' => 'nome da equipe',
            'matricula_assessor' => 'matrícula do assessor',
            'capitulo' => 'capítulo'
        ];
    }
}
