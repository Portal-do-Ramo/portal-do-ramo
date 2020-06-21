<?php

namespace App\Http\Requests\Pedido;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class CriarAtualizarPedidoFinanceiroRequest extends FormRequest
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
            'pedidos' => 'bail|required|array',
            'pedidos.*.nome_produto' => 'required',
            'pedidos.*.valor_unitario' => 'bail|required|numeric',
            'pedidos.*.quantidade' => 'bail|required|integer',
            'pedidos.*.nome_loja' => 'required',
            'pedidos.*.link' => 'bail|present|nullable|url',
            'nome_projeto' => 'bail|present|nullable|exists:projetos,nome_projeto_slug',
            'valor_frete' => 'bail|required|numeric'
        ];
    }

    public function messages()
    {
        return [
            'exists' => 'O campo :attribute está indicando um :attribute que não existe no sistema.',
            'url' => 'O campo :attribute deve ser um link válido'
        ];
    }

    public function attributes()
    {
        return [
            'pedidos.*.nome_produto' => 'nome do produto',
            'pedidos.*.valor_unitario' => 'valor unitário do produto',
            'pedidos.*.quantidade' => 'quantidade',
            'pedidos.*.nome_loja' => 'nome da loja',
            'pedidos.*.data_pedido' => 'data do pedido',
            'nome_projeto' => 'nome do projeto',
            'valor_frete' => 'valor do frete'
        ];
    }
}
