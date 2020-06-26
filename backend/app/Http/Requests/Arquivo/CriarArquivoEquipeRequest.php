<?php

namespace App\Http\Requests\Arquivo;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CriarArquivoEquipeRequest extends FormRequest
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
            'nome_arquivo' => ['required', Rule::unique('arquivos', 'nome')->where(fn($query) => $query->where('tipo_relacionado', 'Equipe')->where('id_relacionado', $this->route('equipe')->nome_equipe_slug))],
            'arquivo' => 'required|base64file'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge(['arquivo' => preg_replace('/data:file\/pdf;base64,/', '', $this->arquivo)]);
    }
}
