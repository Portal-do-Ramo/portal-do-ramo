<?php

namespace App\Http\Requests\Psi;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class CriarPsiRequest extends FormRequest
{
    use ApiRequest;

    public function rules()
    {
        return [
            'nome_psi' => 'bail|required|unique:psis,nome_psi',
            'data_inicio' => 'bail|required|date_format:d/m/Y|after_or_equal:today',
            'data_fim' => 'bail|required|date_format:d/m/Y|after:data_inicio',

            'projetos' => 'present|arrays',
            'projetos.*.projeto' => 'bail|required_with:projetos|exists:projetos,nome_projeto_slug',
            'projetos.*.areas_vagas' => 'required_with:projetos', //Campo das áreas

            'equipes' => 'present|array',
            'equipes.*.equipe' => 'bail|required_with:equipes|exists:equipes,nome_equipe_slug',
            'equipes.*.areas_vagas' => 'required_with:equipes', //Campo das áreas

            'gestao' => 'present|array',
            'gestao.*.nome_area_slug' => 'required_with:gestao',
            'gestao.*.area_vagas' => 'required_with:gestao',
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um :attribute que não existe no sistema.',
            'before_or_equal' => 'O campo :attribute inserido deve ser posterior ou igual a data atual.',
        ];
    }

    public function attributes()
    {
        return [
            'nome_psi' => 'nome do PSI',
            'data_inicio' => 'data de início',
            'data_fim' => 'data de fim',
            'projetos.*.projeto' => 'projeto',
            'equipes.*.equipe' => 'equipe',
        ];
    }
}
