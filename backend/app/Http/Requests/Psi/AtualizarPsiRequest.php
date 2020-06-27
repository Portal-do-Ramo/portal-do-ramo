<?php

namespace App\Http\Requests\Psi;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AtualizarPsiRequest extends FormRequest
{
    use ApiRequest;

    public function rules()
    {
        return [
            'nome_psi' => ['bail', 'required', Rule::unique('psis')->ignore($this->route('psi'),'nome_psi')],
            'data_inicio' => 'bail|required|date_format:d/m/Y',
            'data_fim' => 'bail|required|date_format:d/m/Y|after:data_inicio',

            'projetos' => 'present|array',
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
            'exists' => 'O campo :attribute está indicando um :attribute que não existe no sistema.'
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
