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
            'gestao' => 'present|array',
            'gestao.*.nome_area_slug' => 'required_with:gestao',
            'gestao.*.area_vagas' => 'required_with:gestao',
        ];
    }
}
