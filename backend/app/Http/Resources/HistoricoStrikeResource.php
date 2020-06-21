<?php

namespace App\Http\Resources;

use App\Repositories\Interfaces\StrikeRepositoryInterface;
use Illuminate\Http\Resources\Json\JsonResource;

class HistoricoStrikeResource extends JsonResource
{
    protected $strikeRepository;

    public function __construct($resource, StrikeRepositoryInterface $strikeRepository)
    {
        parent::__construct($resource);
        $this->strikeRepository = $strikeRepository;
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
        ] + $this->strikeRepository->historico($this->resource);
    }
}
