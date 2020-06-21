<?php

namespace App\Http\Requests\Strike;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class CriarReavaliacaoRequest extends FormRequest
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
            'constatacao' => 'required',
            'data' => 'required|date_format:d/m/Y|before_or_equal:today'
        ];
    }

    public function messages()
    {
        return [
            'before_or_equal' => 'O campo :attribute deve conter uma data anterior ou igual a atual'
        ];
    }

    public function attributes()
    {
        return [
            'constatacao' => 'constatação'
        ];
    }
}
