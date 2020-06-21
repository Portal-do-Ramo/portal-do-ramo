<?php

namespace App\Http\Requests\Vaquinha;

use App\Rules\EntreDatas;
use App\Rules\Matricula;
use App\Traits\ApiRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CriarDoacaoVaquinhaRequest extends FormRequest
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
            'matricula_membro_doador' => ['bail', 'required', new Matricula, Rule::exists('usuarios', 'matricula')->where((fn($query) => $query->where('situacao_id', '<>', 3)))],
            'valor' => 'required|numeric',
            'data' => ['required', 'date_format:d/m/Y', new EntreDatas($this->route('vaquinha')->data_inicio, $this->route('vaquinha')->data_fim)]
        ];
    }
}
