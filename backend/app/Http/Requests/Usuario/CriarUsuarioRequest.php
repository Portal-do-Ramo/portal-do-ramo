<?php

namespace App\Http\Requests\Usuario;

use App\Rules\Matricula;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class CriarUsuarioRequest extends FormRequest
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
            'matricula_usuario' => ['bail', 'required', new Matricula, 'unique:usuarios,matricula'],
            'hierarquia_usuario' => 'bail|required|exists:hierarquias,id',
            'email_usuario' => 'bail|required|email|unique:usuarios,email',
            'nome_completo' => 'bail|required|max:90',
            'data_nascimento' => 'bail|required|date_format:d/m/Y|before:today',
            'curso_usuario' => 'bail|required|exists:cursos,id',
            'telefone_principal' => 'bail|required|celular_com_ddd',
            'assessor' => 'bail|required|boolean',
            'marketing' => 'bail|required|boolean',
            'foto' => 'present|nullable|base64image|base64max:1024'
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um :attribute que não existe no sistema.'
        ];
    }

    /**
     * Define como os atributos passados serão chamados na mensagem de erro
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'matricula_usuario' => 'matrícula',
            'hierarquia_usuario' => 'hierarquia',
            'email_usuario' => 'endereço de e-mail',
            'nome_completo' => 'nome completo',
            'data_nascimento' => 'data de nascimento',
            'curso_usuario' => 'curso',
            'telefone_principal' => 'telefone principal'
        ];
    }
}
