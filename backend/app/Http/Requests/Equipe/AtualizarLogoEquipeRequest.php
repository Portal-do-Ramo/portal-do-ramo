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

    public function attributes()
    {
        return [
            'logo_equipe' => 'logo da equipe'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge(['logo_equipe' => preg_replace('/data:image\/(jpg|jpeg|png);base64,/', '', $this->logo_equipe)]);
    }
}
