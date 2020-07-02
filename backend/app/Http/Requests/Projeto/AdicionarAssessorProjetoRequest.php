<?php

namespace App\Http\Requests\Projeto;

use App\Rules\Matricula;
use App\Rules\MatriculaAssessor;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdicionarAssessorProjetoRequest extends FormRequest
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
            'matricula_assessor' => ['bail', 'present', 'nullable', "different:{$this->route}", new Matricula, Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '<>', 3)), new MatriculaAssessor($this->route('projeto')->assessor->first())],
        ];
    }

    public function attributes()
    {
        return [
            'matricula_assessor' => 'matricula do assessor'
        ];
    }
}
