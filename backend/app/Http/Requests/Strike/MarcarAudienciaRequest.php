<?php

namespace App\Http\Requests\Strike;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class MarcarAudienciaRequest extends FormRequest
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
            'data_audiencia' => 'required|date_format:d/m/Y|after_or_equal:today',
            'hora_audiencia' => 'required|date_format:H:i'
        ];
    }

    public function messages()
    {
        return [
            'after_or_equal' => 'O campo :attribute deve ser uma data posterior ou igual a hoje'
        ];
    }

    public function attributes()
    {
        return [
            'data_audiencia' => 'data da audiência',
            'hora_audiencia' => 'hora da audiência'
        ];
    }
}
