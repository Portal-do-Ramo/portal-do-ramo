<?php

namespace App\Http\Resources;

use App\Repositories\Interfaces\VaquinhaRepositoryInterface;
use Illuminate\Http\Resources\Json\JsonResource;

class HistoricoDoacoesVaquinhasResource extends JsonResource
{
    protected $vaquinhaRepository;

    public function __construct($resource, VaquinhaRepositoryInterface $vaquinhaRepository)
    {
        parent::__construct($resource);
        $this->vaquinhaRepository = $vaquinhaRepository;    
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
            'vaquinhas' => $this->vaquinhaRepository->pertencentes($this->resource)
        ];
    }
}
