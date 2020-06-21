<?php

namespace App\Http\Requests\Equipe;

use App\Rules\Matricula;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AtualizarAssessorRequest extends FormRequest
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
            'matricula_assessor' => ['bail', 'required', new Matricula, Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '=', 1))],
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um usuário que não existe no sistema'
        ];
    }

    public function attributes()
    {
        return [
            'matricula' => 'matrícula do assessor'
        ];
    }
}
