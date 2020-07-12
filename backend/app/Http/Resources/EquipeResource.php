<?php

namespace App\Http\Resources;

use App\Repositories\Interfaces\EquipeRepositoryInterface;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipeResource extends JsonResource
{
    protected $equipeRepository;

    public function __construct($resource, EquipeRepositoryInterface $equipeRepository)
    {
        parent::__construct($resource);
        $this->equipeRepository = $equipeRepository;    
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
            'nome_equipe' => $this->nome_equipe,
            'coordenador' => $this->coordenador()->select('matricula', 'nome_completo', 'foto_url')->first(),
            'assessor' => $this->assessor()->select('matricula', 'nome_completo', 'foto_url')->first(),
            'foto_url' => $this->foto_url,
            'capitulo' => $this->capitulo,
            'projetos' => $this->equipeRepository->getProjetos($this->resource),
            'membros' => $this->equipeRepository->getMembros($this->resource)
        ];
    }
}
