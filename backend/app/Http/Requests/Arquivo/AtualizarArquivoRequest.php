<?php

namespace App\Http\Requests\Arquivo;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class AtualizarArquivoRequest extends FormRequest
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
            'arquivo' => 'required|base64file'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge(['arquivo' => preg_replace('/data:file\/pdf;base64,/', '', $this->arquivo)])
    }
}
