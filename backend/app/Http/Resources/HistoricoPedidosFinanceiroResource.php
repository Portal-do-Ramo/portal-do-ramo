<?php

namespace App\Http\Resources;

use App\Repositories\Interfaces\PedidoRepositoryInterface;
use Illuminate\Http\Resources\Json\JsonResource;

class HistoricoPedidosFinanceiroResource extends JsonResource
{
    protected $pedidoRepository;

    public function __construct($resource, PedidoRepositoryInterface $pedidoRepository)
    {
        parent::__construct($resource);
        $this->pedidoRepository = $pedidoRepository;
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
            'pedidos' => $this->pedidoRepository->historicoFinanceiro($this->resource)
        ];
    }
}
