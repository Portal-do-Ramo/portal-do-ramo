<?php

namespace App\Http\Requests\Falta;

use App\Rules\Matricula;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CriarFaltaRequest extends FormRequest
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
            'matricula_membro' => ['bail','required', new Matricula, Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '<>', 3))],
            'data' => 'bail|required|date_format:d/m/Y|before_or_equal:today',
            'tipo_id' => 'required|integer|exists:tipo_faltas,id',
            'descricao' => 'present|nullable',
            'nome_projeto' => 'bail|present|nullable|required_if:tipo_id,3|exists:projetos,nome_projeto_slug',
        ];
    }

    public function messages()
    {
        return [
            'before_or_equal' => 'O campo :attribute inserido deve ser anterior ou igual a data atual.',
            'exists' => 'O campo :attribute está indicando um :attribute que não existe no sistema.',
            'nome_projeto.required_if' => 'O campo :attribute é obrigatório quando trata-se de uma falta a reunião de projeto.'
        ];
    }

    public function attributes()
    {
        return [
            'matricula_membro' => 'membro',
            'tipo_id' => 'tipo',
            'descricao' => 'descrição',
            'nome_projeto' => 'nome do projeto'
        ];
    }
}
