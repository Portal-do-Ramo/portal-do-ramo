<?php

namespace App\Http\Requests\Evento;

use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;

class CriarAlterarDadosEventoRequest extends FormRequest
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
            'nome_evento' => 'required',
            'data_evento' => 'bail|required|date_format:d/m/Y|after_or_equal:today',
            'hora_evento' => 'bail|required|date_format:H:i',
            'descricao' => 'present|nullable',
            'evento_diretoria' => 'bail|required|boolean'
        ];
    }

    public function messages()
    {
        return [
            'after_or_equal' => 'O campo :attribute deve ser uma data posterior ou igual a hoje'
        ];
    }

    public function attributes()
    {
        return [
            'nome_evento' => 'nome do evento',
            'data_evento' => 'data do evento',
            'hora_evento' => 'hora do evento',
            'descricao' => 'descrição',
            'evento_diretoria' => 'evento da diretoria'
        ];
    }
}
