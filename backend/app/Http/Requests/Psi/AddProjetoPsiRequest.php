<?php

namespace App\Http\Requests\Psi;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class AddProjetoPsiRequest extends FormRequest
{
    use ApiRequest;

    public function rules()
    {
        return [
            'projetos' => 'present|arrays',
            'projetos.*.projeto' => 'bail|required_with:projetos|exists:projetos,nome_projeto_slug',
            'projetos.*.areas_vagas' => 'required_with:projetos', //Campo das áreas
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um :attribute que não existe no sistema.'
        ];
    }
}
