<?php

namespace App\Http\Requests\Arquivo;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CriarArquivoProjetoRequest extends FormRequest
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
            'nome_arquivo' => ['required', Rule::unique('arquivos', 'nome')->where(fn($query) => $query->where('tipo_relacionado', 'Projeto')->where('id_relacionado', $this->route('projeto')->nome_projeto_slug))],
            'arquivo' => 'required|base64file|base64mimetypes:application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge(['arquivo' => preg_replace('/data:application\/(pdf|vnd.openxmlformats-officedocument.(wordprocessingml.document|spreadsheetml.sheet)+)+;base64,/', '', $this->arquivo)]);
    }
}
