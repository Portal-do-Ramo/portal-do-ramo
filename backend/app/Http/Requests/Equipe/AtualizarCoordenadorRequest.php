<?php

namespace App\Http\Requests\Equipe;

use App\Rules\Matricula;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AtualizarCoordenadorRequest extends FormRequest
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
            'matricula_coordenador' => ['bail', 'required', new Matricula, Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '=', 1)), Rule::unique('equipes', 'matricula_coordenador')->ignore($this->route('equipe'))]
        ];
    }

    public function messages()
    {
        return [
            'unique' => 'O campo :attribute corresponde a um membro que já é coordenador de uma equipe',
            'exists' => 'O campo :attribute está indicando um usuário que não existe no sistema'
        ];
    }

    public function attributes()
    {
        return [
            'matricula_coordenador' => 'matrícula do coordenador'
        ];
    }
}
