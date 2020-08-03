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
            'logo_equipe' => 'required|base64image|base64mimetypes:image/jpeg,image/jpeg,image/png'
        ];
    }

    public function attributes()
    {
        return [
            'logo_equipe' => 'logo da equipe'
        ];
    }
}
