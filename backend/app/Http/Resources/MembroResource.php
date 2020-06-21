<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MembroResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        return [
            'telefone_secundario' => $this->telefones['telefone_secundario'] ?? NULL,
            'rg' => $this->rg,
            'cpf' => $this->cpf,
            'tipo_sanguineo' => $this->tipo_sanguineo,
            'cadastro_robocore' => $this->cadastro_robocore,
            'numero_ieee' => $this->numero_ieee,
            'data_fim_membresia' => $this->data_fim_membresia,
            'medicamentos_utiliza' => $this->medicamentos_utiliza,
            'medicamentos_alergico' => $this->medicamentos_alergico,
            'alimentos_alergico' => $this->alimentos_alergico,
            'condicoes_especiais' => $this->condicoes_especiais,
            'info_contato' => $this->info_contato,
        ];
    }
}
