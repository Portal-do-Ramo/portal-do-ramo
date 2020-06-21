<?php

namespace App\Http\Requests\Projeto;

use App\Rules\Matricula;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdicionarMembroProjetoRequest extends FormRequest
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
            'matricula_membro' => ['bail', 'required', new Matricula, Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '<>', 3)), Rule::notIn($this->route('projeto')->matriculaMembrosAtivosPertencentes()->toArray())],
            'area' => ['present', 'nullable', Rule::in($this->route('projeto')->areas)]
        ];
    }

    public function messages()
    {
        return [
            'notIn' => 'O membro em questão já se encontra no projeto selecionado',
            'area.in' => 'O campo :attribute deve conter uma das seguintes: ' . implode(', ', $this->route('projeto')->areas) 
        ];
    }

    public function attributes()
    {
        return [
            'matricula_membro' => 'matrícula do membro',
            'area' => 'área'
        ];
    }
}
