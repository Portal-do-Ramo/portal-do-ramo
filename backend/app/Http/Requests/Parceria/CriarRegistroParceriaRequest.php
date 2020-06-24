<?php

namespace App\Http\Requests\Parceria;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class CriarRegistroParceriaRequest extends FormRequest
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
            'nome_empresa' => 'required',
            'link_site_empresa' => 'required|URL',
            'beneficios' => 'required',
            'equipes_beneficiadas' => 'required|array',
            'equipes_beneficiadas.*' => 'required|exists:equipe,nome_equipe',
            'como_encaixamos' => 'required',
            'email_empresa' => 'present|nullable|required_if:telefone_empresa,null',
            'telefone_empresa' => 'present|nullable|required_if:email_empresa,null'
        ];
    }

    public function messages()
    {
        return [
            'required_if' => 'É nescessário pelo menos preencher um campo para contato da empresa'
        ];
    }

    public function attributes()
    {
        return [
            'nome_empresa' => 'nome da empresa',
            'link_site_empresa' => 'link do site da empresa',
            'beneficios' => 'benefícios',
            'equipes_beneficiadas.*' => 'equipe benificada',
            'como_encaixamos' => 'como nos encaixamos',
            'email_empresa' => 'e-mail da empresa',
            'telefone_empresa' => 'telefone da empresa'
        ];
    }
}
