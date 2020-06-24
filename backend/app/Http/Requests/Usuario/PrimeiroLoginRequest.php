<?php

namespace App\Http\Requests\Usuario;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PrimeiroLoginRequest extends FormRequest
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
            'cpf_usuario' => 'bail|required|formato_cpf|cpf|unique:membros,cpf',
            'orgao_emissor' => 'required',
            'rg_usuario' => ['required', Rule::unique('membros', 'rg')->where(fn($query) => $query->where('orgao_emissor', $this->orgao_emissor))->ignore($this->route('usuario')->membro)],
            'telefone_secundario' => 'bail|present|nullable|telefone_com_ddd',
            'senha_usuario' => 'bail|required|min:4',
            'tipo_sanguineo' => 'required',
            'medicamentos_utiliza' => 'present',
            'medicamentos_alergico' => 'present',
            'condicao_especial' => 'present',
            'alimentos_alergico' => 'present',
            'nome_contato_emergencia' => 'required',
            'grau_parentesco_contato' => 'required',
            'telefone_contato_emergencia' => 'bail|required|celular_com_ddd'
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
            'cpf_usuario' => 'CPF',
            'orgao_emissor' => 'Órgão emissor',
            'rg_usuario' => 'RG',
            'telefone_secundario' => 'telefone secundário',
            'senha_usuario' => 'senha',
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
