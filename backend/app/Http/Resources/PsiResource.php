<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PsiResource extends JsonResource
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
            'nome_psi'=> $this->nome_psi,
            'nome_psi_slug' => $this->nome_psi_slug,
            'data_criada'=> $this->data_criado->format('d/m/Y'),
            'data_inicio'=> $this->data_inicio->format('Y-m-d'),
            'data_fim'=> $this->data_fim->format('Y-m-d'),
            'aberto' => $this->aberto,
            'membro_criou' => $this->formatarMembroCriou($this->membroCriou),
            'gestao_areas_vagas' => $this->gestao_areas_vagas,
            'projetos'=> $this->projetos()->select('projetos.nome_projeto','projetos.nome_projeto_slug','nome_equipe')->get(),
            'equipes'=> $this->equipes()->select('equipes.nome_equipe','equipes.nome_equipe_slug','matricula_coordenador')->get(),
            'membros_inscritos'=> $this->membrosInscritosFormatado()
        ];
    }
}
