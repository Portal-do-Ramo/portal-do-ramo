<?php

namespace App\Http\Requests\Usuario;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AtualizarUsuarioRequest extends FormRequest
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
            'email_usuario' => ['bail', 'required', 'email', Rule::unique('usuarios','email')->ignore($this->route('usuario'))],
            'telefone_principal' => 'required|celular_com_ddd',
            'telefone_secundario' => 'present|nullable|telefone_com_ddd',
            'tipo_sanguineo' => 'required',
            'medicamentos_utiliza' => 'present',
            'medicamentos_alergico' => 'present',
            'condicao_especial' => 'present',
            'alimentos_alergico' => 'present',
            'nome_contato_emergencia' => 'required',
            'grau_parentesco_contato' => 'required',
            'telefone_contato_emergencia' => 'required|celular_com_ddd'
        ];
    }

    public function attributes()
    {
        return [
            'email_usuario' => 'email',
            'telefone_principal' => 'telefone principal',
            'telefone_secundario' => 'telefone secundário',
            'tipo_sanguineo' => 'tipo sanguíneo',
            'medicamentos->utiliza' => 'medicamentos que utiliza',
            'medicamentos_alergico' => 'medicamentos que é alérgico',
            'condicao_especial' => 'condição especial',
            'alimentos_alergico' => 'alimentos que é alérgico',
            'nome_contato_emergencia' => 'nome do contato de emergência',
            'grau_parentesco_contato' => 'grau de parentesco do contato',
            'telefone_contato_emergencia' => 'telefone de emergência'
        ];
    }
}
