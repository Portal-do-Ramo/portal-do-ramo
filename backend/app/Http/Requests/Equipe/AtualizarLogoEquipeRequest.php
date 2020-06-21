<?php

namespace App\Http\Requests\Equipe;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class AtualizarLogoEquipeRequest extends FormRequest
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
            'logo_equipe' => 'required|base64image'
        ];
    }

    public function messages()
    {
        return [
            'base64image' => 'O campo :attribute deve conter uma imagem válida'
        ];
    }

    public function attributes()
    {
        return [
            'logo_equipe' => 'logo da equipe'
        ];
    }
}
