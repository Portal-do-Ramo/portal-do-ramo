<?php

namespace App\Http\Requests\Strike;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'constatacao' => ['required', Rule::in(['Manter', 'Retirar'])],
            'data' => 'required|date_format:d/m/Y|before_or_equal:today',
            'votos_manter' => 'required|integer',
            'votos_retirar' => 'required|integer',
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
            'constatacao' => 'constatação',
            'votos_manter' => 'votos para manter',
            'votos_retirar' => 'votos para retirar',
        ];
    }
}
