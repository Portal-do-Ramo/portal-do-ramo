<?php

namespace App\Http\Controllers\Vaquinha;

use App\Http\Resources\HistoricoDoacoesVaquinhasResource;
use App\Models\DoacaoVaquinha;
use App\Models\Usuario;
use App\Repositories\Interfaces\VaquinhaRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class DoacoesVaquinhaController extends AbstractVaquinhaController
{
    public function __construct(VaquinhaRepositoryInterface $vaquinhaRepository)
    {
        parent::__construct($vaquinhaRepository);
        $this->authorizeResource(DoacaoVaquinha::class);
    }
    
    public function historico(Usuario $usuario)
    {
        return new HistoricoDoacoesVaquinhasResource($usuario, $this->vaquinhaRepository);
    }

    public function minhasDoacoesVaquinhas()
    {
        return $this->vaquinhaRepository->pertencentes(Auth::user());
    }

    protected function resourceAbilityMap()
    {
        return [
            'historico' => 'viewAny',
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return ['historico'];
    }
}
