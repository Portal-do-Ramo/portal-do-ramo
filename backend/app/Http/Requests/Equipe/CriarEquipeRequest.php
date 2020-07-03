<?php

namespace App\Http\Requests\Equipe;

use App\Models\UsuarioAtivo;
use App\Rules\Matricula;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CriarEquipeRequest extends FormRequest
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
            'nome_equipe' => 'bail|required|unique:equipes',
            'matricula_coordenador' => ['bail', 'required', new Matricula, Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '<>', 3)), Rule::notIn(UsuarioAtivo::diretoria()->get()->pluck('matricula')->values())],
            'matricula_assessor' => ['bail','present', 'nullable', 'different:matricula_coordenador', new Matricula, Rule::exists('usuarios', 'matricula')->where(fn($query) => $query->where('situacao_id', '<>', 3))],
            'capitulo' => 'present|nullable',
            'porcentagem_orcamento' => 'required|numeric',
            'logo_equipe' => 'present|nullable|base64image'
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um usuário que não existe no sistema.',
        ];
    }

    public function attributes()
    {
        return [
            'nome_equipe' => 'nome da equipe',
            'matricula_coordenador' => 'matrícula do coordenador',
            'matricula_assessor' => 'matrícula do assessor',
            'capitulo' => 'capítulo',
            'porcentagem_orcamento' => 'porcentagem do orçamento'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge(['logo_equipe' => preg_replace('/data:image\/(jpg|jpeg|png);base64,/', '', $this->logo_equipe)]);
    }
}
