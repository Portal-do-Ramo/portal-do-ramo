<?php

namespace App\Http\Requests\Pedido;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class CriarPedidoDeReembolsoRequest extends FormRequest
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
            'foto_comprovante' => 'required|base64image'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge(['foto_comprovante' => preg_replace('/data:image\/(jpg|jpeg|png);base64,/', '', $this->foto)]);
    }
}
