<?php

namespace App\Http\Requests\Vaquinha;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class CriarVaquinhaRequest extends FormRequest
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
            'nome_vaquinha' => 'required|unique:vaquinhas',
            'data_inicio' => 'required|date_format:d/m/Y|after_or_equal:today'
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
            'nome_vaquinha' => 'nome da vaquinha',
            'data_inicio' => 'data de início'
        ];
    }
}
