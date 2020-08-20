<?php

namespace App\Http\Controllers\Strike;

use App\Http\Requests\Strike\CriarReavaliacaoRequest;
use App\Http\Requests\Strike\CriarStrikeRequest;
use App\Http\Resources\HistoricoStrikeResource;
use App\Models\Strike;
use App\Models\Usuario;
use App\Repositories\Interfaces\StrikeRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class StrikeController extends AbstractStrikeController
{
    public function __construct(StrikeRepositoryInterface $strikeRepository)
    {
        parent::__construct($strikeRepository);
        $this->authorizeResource(Strike::class, 'strike');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->strikeRepository->index();
    }

    public function meusStrikes()
    {
        return $this->strikeRepository->pertencentes();
    }

    public function historico(Usuario $usuario)
    {
        return new HistoricoStrikeResource($usuario, $this->strikeRepository);
    }

    public function strikesSolicitados()
    {
        return $this->strikeRepository->getStrikesSolicitados();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CriarStrikeRequest $request)
    {
        $this->strikeRepository->create($request->validated());
        return response()->json('Registro de strike criado com sucesso', 201);
    }

    public function adicionarReavaliacao(CriarReavaliacaoRequest $request, Strike $strike)
    {
        $this->strikeRepository->addReavaliacao($strike, $request->validated());
        return response()->json('Registro de reavaliação criada com sucesso', 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Strike  $strike
     * @return \Illuminate\Http\Response
     */
    public function aprovar(Strike $strike)
    {
        $strike->aprovar();
        return response()->json('Strike aprovado com sucesso', 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Strike  $strike
     * @return \Illuminate\Http\Response
     */
    public function manter(Strike $strike)
    {
        $strike->manter();
        return response()->json('Strike mantido com sucesso', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Strike  $strike
     * @return \Illuminate\Http\Response
     */
    public function destroy(Strike $strike)
    {
        if($strike->aprovado)
        {
            $strike->retirar();
            return response()->json('Strike retirado com sucesso', 200);
        }

        $strike->reprovar();
        return response()->json('Strike reprovado com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'index' => 'viewAny',
            'historico' => 'viewAny',
            'strikesSolicitados' => 'viewAny',
            'adicionarReavaliacao' => 'adicionarReavaliacao',
            'aprovar' => 'aprovar',
            'manter' => 'manter',
            'destroy' => 'delete'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return ['index', 'historico', 'strikesSolicitados', 'strikesComAudiencia'];
    }
}
