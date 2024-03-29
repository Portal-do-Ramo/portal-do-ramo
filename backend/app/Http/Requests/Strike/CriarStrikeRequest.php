<?php

namespace App\Http\Requests\Strike;

use App\Rules\Matricula;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CriarStrikeRequest extends FormRequest
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
            'membro_aplicou' => ['bail', 'required', Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '<>', 3)), new Matricula],
            'membro_recebeu' => ['bail', 'required', Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '<>', 3)), new Matricula],
            'motivo' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'membro_recebeu' => 'membro selecionado'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge(['membro_aplicou' => $this->membro_aplicou ?? Auth::id()]);
    }
}
