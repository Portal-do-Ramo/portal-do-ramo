<?php

namespace App\Http\Requests\Projeto;

use App\Rules\Matricula;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CriarProjetoRequest extends FormRequest
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
            'nome_projeto' => 'bail|required|unique:projetos,nome_projeto',
            'data_inicio' => 'bail|required|date_format:d/m/Y',
            'data_fim' => 'bail|present|nullable|date_format:d/m/Y|after:data_inicio',
            'matricula_lider' => ['bail', 'present', 'nullable', new Matricula, Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '=', 1))],
            'matricula_assessor' => ['bail', 'present', 'nullable', new Matricula, Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '=', 1))],
            'nome_equipe' => 'bail|required|exists:equipes,nome_equipe_slug',
            'porcentagem_orcamento' => 'bail|required|numeric',
            'areas' => 'present|nullable|array',
            'link_trello' => 'bail|present|nullable|url|starts_with:https://trello.com/b/'
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um registro que não existe no sistema.',
        ];
    }

    public function attributes()
    {
        return [
            'nome_projeto' => 'nome do projeto',
            'data_inicio' => 'data de início',
            'data_fim' => 'data de fim',
            'matricula_lider' => 'líder',
            'matricula_assessor' => 'assessor',
            'nome_equipe' => 'nome da equipe',
            'porcentagem_orcamento' => 'porcentagem do orçamento',
            'areas' => 'áreas',
            'link_trello' => 'link do trello'
        ];
    }
}
