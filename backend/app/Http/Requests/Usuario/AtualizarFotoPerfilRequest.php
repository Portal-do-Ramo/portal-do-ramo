<?php

namespace App\Http\Requests\Usuario;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class AtualizarFotoPerfilRequest extends FormRequest
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
            'foto' => 'required|base64image|base64mimetypes:image/jpeg,image/jpeg,image/png'
        ];
    }
}
