<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LoginResource extends JsonResource
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
            'situacao' => $this->situacao->nome,
            'data_nascimento' => $this->membro->data_nascimento->format('d/m/Y'),
            'idade' => $this->membro->idade,
            'curso' => $this->membro->curso->nome,
            'celular' => $this->membro->celular,
            'pagante'=> $this->membro->pagante,
            'assessor_flag' => $this->assessor,
            'marketing_flag' => $this->marketing,
            'notificacoes' => $this->notifications()->select('id', 'data', 'read_at', 'created_at')->get()->take(-6)->map(fn($notificacao) => $notificacao->formatar())->values(),
            'quantidade_strikes' => $this->strikesRecebeuAprovados()->count(),
            'quantidade_faltas_rg' => $this->getQuantidadeFaltas('Reunião Geral', null),
            'quantidade_faltas_exposup' => $this->getQuantidadeFaltas('Exposup', null),
            'quantidade_faltas_equipe' => $this->getQuantidadeFaltas('Reunião de Projeto', null),
            'projetos' => $this->projetosFormatados(),
            'equipes' => $this->equipesFormatadas(),
        ];
    }
}
