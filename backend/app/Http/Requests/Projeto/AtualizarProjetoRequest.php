<?php

namespace App\Http\Requests\Projeto;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AtualizarProjetoRequest extends FormRequest
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
            'nome_projeto' => ['bail', 'required', Rule::unique('projetos')->ignore($this->route('projeto'))],
            'data_inicio' => 'bail|required|date_format:d/m/Y',
            'data_fim' => 'bail|present|nullable|date_format:d/m/Y|after:data_inicio',
            'estagio' => ['bail', 'required', Rule::in(['Fase de pesquisa', 'Apresentação', 'Fase de execução', 'Fase de conclusão', 'Fase de checagem', 'Concluído'])],
            'link_trello' => 'bail|present|nullable|url|starts_with:https://trello.com/b/'
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um registro que não existe no sistema.'
        ];
    }

    public function attributes()
    {
        return [
            'nome_projeto' => 'nome do projeto',
            'data_inicio' => 'data de início',
            'data_fim' => 'data de fim',
            'estagio' => 'estágio',
            'link_trello' => 'link do trello'
        ];
    }
}
