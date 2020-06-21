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
            'equipe' => 'bail|required|exists:equipes,nome_equipe_slug',
            'areas_vagas' => 'required', //Campo das áreas
            'areas_vagas.*' => 'bail|required|integer' //Campo das vagas
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um :attribute que não existe no sistema.'
        ];
    }
}
