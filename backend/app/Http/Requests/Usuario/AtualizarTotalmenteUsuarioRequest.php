<?php

namespace App\Http\Requests\Usuario;

use App\Rules\CadastroRobocore;
use App\Rules\Matricula;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AtualizarTotalmenteUsuarioRequest extends FormRequest
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
            'matricula_usuario' => ['bail', 'required', new Matricula, Rule::unique('usuarios','matricula')->ignore($this->route('usuario'))],
            'hierarquia_usuario' => 'bail|required|exists:hierarquias,id',
            'nome_completo' => 'bail|required|max:90',
            'cpf_usuario' => ['bail', 'required', 'formato_cpf', 'cpf', Rule::unique('membros','cpf')->ignore($this->route('usuario')->membro)],
            'rg_usuario' => 'required',
            'email_usuario' => ['bail', 'required', 'email', Rule::unique('usuarios','email')->ignore($this->route('usuario'))],
            'data_nascimento' => 'bail|required|date_format:d/m/Y',
            'curso_usuario' => 'required',
            'telefone_principal' => 'required|celular_com_ddd',
            'telefone_secundario' => 'present|nullable|telefone_com_ddd',
            'pagante' => 'bail|required|boolean',
            'numero_ieee' => 'required_if:pagante,true',
            'data_fim_membresia' => 'required_if:pagante,true',
            'cadastro_robocore' => ['present','nullable', new CadastroRobocore($this->input('email_usuario'))],
            'tipo_sanguineo' => 'required',
            'medicamentos_utiliza' => 'present',
            'medicamentos_alergico' => 'present',
            'condicao_especial' => 'present',
            'alimentos_alergico' => 'present',
            'nome_contato_emergencia' => 'required',
            'grau_parentesco_contato' => 'required',
            'telefone_contato_emergencia' => 'bail|required|celular_com_ddd',
            'assessor' => 'bail|required|boolean',
            'marketing' => 'bail|required|boolean'
        ];
    }

    public function messages()
    {
        return [
            'numero_ieee.required_if' => 'O campo :attribute deve estar preenchido caso o membro seja pagante'
        ];
    }

    public function attributes()
    {
        return [
            'matricula_membro' => 'matrícula',
            'hierarquia_membro' => 'hierarquia',
            'nome_completo' => 'nome completo',
            'cpf_membro' => 'CPF',
            'rg_membro' => 'RG',
            'email_membro' => 'endereço de e-mail',
            'data_nascimento' => 'data de nascimento',
            'curso_membro' => 'curso',
            'telefone_principal' => 'telefone principal',
            'telefone_secundario' => 'telefone secundário',
            'numero_ieee' => 'número de cadastro do IEEE',
            'cadastro_robocore' => 'cadastro da Robocore',
            'tipo_sanguineo' => 'tipo sanguíneo',
            'medicamentos_utiliza' => 'medicamentos que utiliza',
            'medicamentos_alergico' => 'medicamentos que é alérgico',
            'condicao_especial' => 'condição especial',
            'alimentos_alergico' => 'alimentos que é alérgico',
            'nome_contato_emergencia' => 'nome do contato',
            'grau_parentesco_contato' => 'grau de parentesco',
            'telefone_contato_emergencia' => 'telefone do contato de emergencia'
        ];
    }
}
