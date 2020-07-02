<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PerfilCompletoResource extends JsonResource
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
            'matricula' => $this->matricula,
            'nome_completo' => $this->nome_completo,
            'email' => $this->email,
            'hierarquia' => $this->hierarquia->nome,
            'foto_url' => $this->foto_url,
            'data_nascimento' => $this->membro->data_nascimento->format('Y-m-d'),
            'idade' => $this->membro->idade,
            'curso' => $this->membro->curso->nome,
            'celular' => $this->membro->celular,
            'telefone_secundario' => $this->membro->telefones['telefone_secundario'] ?? NULL,
            'pagante'=> $this->membro->pagante,
            'situacao' => $this->situacao->nome,
            'assessor_flag' => $this->assessor,
            'marketing_flag' => $this->marketing,
            'orgao_emissor' => $this->membro->orgao_emissor,
            'rg' => $this->membro->rg,
            'cpf' => $this->membro->cpf,
            'tipo_sanguineo' => $this->membro->tipo_sanguineo,
            'cadastro_robocore' => $this->membro->cadastro_robocore,
            'numero_ieee' => $this->membro->numero_ieee,
            'data_fim_membresia' => $this->membro->data_fim_membresia,
            'medicamentos_utiliza' => $this->membro->medicamentos_utiliza,
            'medicamentos_alergico' => $this->membro->medicamentos_alergico,
            'alimentos_alergico' => $this->membro->alimentos_alergico,
            'condicoes_especiais' => $this->membro->condicoes_especiais,
            'info_contato' => $this->membro->info_contato,
            'quantidade_strikes' => $this->strikesRecebeuAprovados()->count(),
            'quantidade_faltas_rg' => $this->getQuantidadeFaltas('Reunião Geral', null),
            'quantidade_faltas_exposup' => $this->getQuantidadeFaltas('Exposup', null),
            'quantidade_faltas_equipe' => $this->getQuantidadeFaltas('Reunião de Projeto', null),
            'projetos' => $this->projetosFormatados(),
            'equipes' => $this->equipesFormatadas()
        ];
    }
}
