<?php

namespace App\Http\Resources;

use App\Repositories\Interfaces\ProjetoRepositoryInterface;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjetoResource extends JsonResource
{
    protected $projetoRepository;

    public function __construct($resource, ProjetoRepositoryInterface $projetoRepository)
    {
        parent::__construct($resource);
        $this->projetoRepository = $projetoRepository;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $membros = $this->projetoRepository->getMembros($this->resource);
        return [
            'nome_slug' => $this->nome_projeto_slug,
            'nome' => $this->nome_projeto,
            'data_inicio' => $this->data_inicio->format('Y-m-d'),
            'data_fim' => $this->data_fim ? $this->data_fim->format('Y-m-d') : null,
            'lider' => $membros->where('funcao', 'Líder')->first(),
            'assessor' => $membros->where('funcao', 'Assessor')->first(),
            'nome_equipe_slug' => $this->equipe->nome_equipe_slug,
            'nome_equipe' => $this->equipe->nome_equipe,
            'foto_equipe' => $this->equipe->foto_url,
            'estagio' => $this->estagio,
            'areas' => $this->areas,
            'ativo' => $this->ativo,
            'link_trello' => $this->link_trello,
            'arquivos' => $this->projetoRepository->getArquivos($this->resource),
            'eventos' => $this->projetoRepository->getEventos($this->resource),
            'membros' => $membros->whereIn('funcao', ['Membro', 'Líder'])->values()
        ];
    }
}
