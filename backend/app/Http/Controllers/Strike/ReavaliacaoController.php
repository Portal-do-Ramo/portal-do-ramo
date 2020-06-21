<?php

namespace App\Http\Controllers\Strike;

use App\Http\Requests\Strike\CriarReavaliacaoRequest;
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CriarReavaliacaoRequest $request, Strike $strike)
    {
        $this->strikeRepository->addReavaliacao($strike, $request->validated());
        return response()->json('Registro de reavaliação criada com sucesso', 201);
    }

    public function destroy(Reavaliacao $reavaliacao)
    {
        $this->strikeRepository->deleteReavaliacao($reavaliacao);
        return response()->json('Reavaliacao removida com sucesso', 200);
    }
}
