<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Repositories\Interfaces\FaltaRepositoryInterface;

class HistoricoFaltaResource extends JsonResource
{
    protected $faltaRepository;

    public function __construct($resource, FaltaRepositoryInterface $faltaRepository)
    {
        parent::__construct($resource);
        $this->faltaRepository = $faltaRepository;
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
            'equipes' => $this->iconesEquipesParticipa()
        ] + $this->faltaRepository->referentes($this->resource);
    }
}
