<?php

namespace App\Http\Requests\Auth;

use App\Rules\Matricula;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class LoginRequest extends FormRequest
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
            'matricula_usuario' => ['bail', 'required', new Matricula, Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '<>', 3))],
            'senha_usuario' => 'required'
        ];
    }
}
