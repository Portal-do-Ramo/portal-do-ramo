<?php

namespace App\Http\Controllers\Strike;

use App\Models\Reavaliacao;
use App\Models\Strike;
use App\Repositories\Interfaces\StrikeRepositoryInterface;

class ReavaliacaoController extends AbstractStrikeController
{
    public function __construct(StrikeRepositoryInterface $strikeRepository)
    {
        parent::__construct($strikeRepository);
        $this->authorizeResource(Reavaliacao::class, 'reavaliacao');
    }

    public function index(Strike $strike)
    {
        return $this->strikeRepository->getReavaliacoes($strike);
    }

    public function strikesASeremReavaliados()
    {
        return $this->strikeRepository->getStrikesASeremReavaliados();
    }

    public function destroy(Reavaliacao $reavaliacao)
    {
        $this->strikeRepository->deleteReavaliacao($reavaliacao);
        return response()->json('Reavaliacao removida com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'index' => 'viewAny',
            'strikesASeremReavaliados' => 'viewAny',
            'destroy' => 'delete'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return ['index', 'strikesASeremReavaliados'];
    }
}
