<?php

namespace App\Http\Requests\Parceria;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class AtualizarRegistroParceriaRequest extends FormRequest
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
            //
        ];
    }
}
