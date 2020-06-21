<?php

namespace App\Http\Requests\Psi;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class AddAreaGestaoRequest extends FormRequest
{
    use ApiRequest;

    public function rules()
    {
        return [
            'nome_area_slug' => 'required',
            'area_vagas' => 'required',
            'area_vagas.*' => 'bail|required|integer',
        ];
    }
}
