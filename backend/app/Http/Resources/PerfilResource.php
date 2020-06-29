<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PerfilResource extends JsonResource
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
            'nome_completo' => $this->nome_completo,
            'email' => $this->email,
            'hierarquia' => $this->hierarquia->nome,
            'foto_url' => $this->foto_url,
            'data_nascimento' => $this->membro->data_nascimento->format('d/m/Y'),
            'idade' => $this->membro->idade,
            'pagante' => $this->membro->pagante,
            'celular' => $this->membro->celular,
            'curso' => $this->membro->curso->nome,
            'assessor_flag' => $this->assessor,
            'marketing_flag' => $this->marketing,
            'robocore_flag' => $this->membro->cadastro_robocore != NULL,
            'ativo' => $this->ativo,
            'projetos' => $this->projetosFormatados(),
            'equipes' => $this->equipesFormatadas()
        ];
    }
}
