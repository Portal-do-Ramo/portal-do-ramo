<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Repositories\Interfaces\ProjetoRepositoryInterface;

class HistoricoProjetoResource extends JsonResource
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
        return [
            'matricula' => $this->matricula,
            'nome_completo' => $this->nome_completo,
            'foto_url' => $this->foto_url,
            'hierarquia' => $this->hierarquia->nome,
            'equipes' => $this->iconesEquipesParticipa(),
            'projetos' => $this->projetoRepository->historicoProjetos($this->resource)
        ];
    }
}
