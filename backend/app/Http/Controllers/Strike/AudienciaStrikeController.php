<?php

namespace App\Http\Controllers\Strike;

use App\Http\Requests\Strike\MarcarAudienciaRequest;
use App\Models\Strike;
use App\Repositories\Interfaces\StrikeRepositoryInterface;

class AudienciaStrikeController extends AbstractStrikeController
{
    public function __construct(StrikeRepositoryInterface $strikeRepository)
    {
        parent::__construct($strikeRepository);
        $this->authorizeResource(Strike::class, 'strike');
    }

    public function strikesComAudiencia()
    {
        return $this->strikeRepository->getStrikesAudienciaSolicitada();
    }

    public function solicitarAudiencia(Strike $strike)
    {
        $strike->solicitarAudiencia();
        return response()->json('Audiência solicitada com sucesso', 200);
    }

    public function marcarAudiencia(MarcarAudienciaRequest $request, Strike $strike)
    {
        $strike->marcarAudiencia($request->validated());
        return response()->json('Audiência marcada com sucesso', 200);
    }

    public function remarcarAudiencia(MarcarAudienciaRequest $request, Strike $strike)
    {
        $strike->remarcarAudiencia($request->validated());
        return response()->json('Audiência remarcada com sucesso', 200);
    }

    public function desmarcarAudiencia(Strike $strike)
    {
        $strike->desmarcarAudiencia();
        return response()->json('Audiência desmarcada com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'strikesComAudiencia' => 'viewAny',
            'solicitarAudiencia' => 'solicitarAudiencia',
            'marcarAudiencia' => 'marcarAudiencia',
            'remarcarAudiencia' => 'remarcarAudiencia',
            'desmarcarAudiencia' => 'desmarcarAudiencia'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return ['strikesComAudiencia'];
    }
}
