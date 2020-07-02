<?php

namespace App\Http\Requests\Psi;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class AddEquipePsiRequest extends FormRequest
{
    use ApiRequest;

    public function rules()
    {
        return [
            'equipes' => 'required|array',
            'equipes.*.equipe' => 'bail|required|exists:equipes,nome_equipe_slug',
            'equipes.*.areas_vagas' => 'required|array', //Campo das áreas
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um :attribute que não existe no sistema.'
        ];
    }
}
