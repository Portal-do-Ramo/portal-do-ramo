<?php

namespace App\Http\Controllers\RegistroDeCaixa;

use App\Http\Controllers\ApiController;
use App\Http\Requests\RegistroDeCaixa\CriarRegistroDeCaixaRequest;
use App\Models\Equipe;
use App\Models\RegistroDeCaixa;
use App\Repositories\Interfaces\RegistroDeCaixaRepositoryInterface;

class RegistroDeCaixaController extends ApiController
{
    protected $registroCaixaRepository;

    public function __construct(RegistroDeCaixaRepositoryInterface $registroCaixaRepository)
    {
        parent::__construct();
        $this->registroCaixaRepository = $registroCaixaRepository;
        $this->authorizeResource(RegistroDeCaixa::class);    
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->registroCaixaRepository->index();
    }

    /**
     * Retorna os registros de compra filtrados por ano
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function registrosAnuais()
    {
        return $this->registroCaixaRepository->todosRegistrosAnuais();
    }

    public function todosGastosAnuais()
    {
        return $this->registroCaixaRepository->todosGastosAnuais();
    }

    public function gastosAnuaisEquipes()
    {
        return $this->registroCaixaRepository->gastosAnuaisEspecificos();
    }

    public function fluxoAnual()
    {
        return $this->registroCaixaRepository->fluxoAnual();
    }

    public function anosDisponiveis()
    {
        return $this->registroCaixaRepository->getAnosRegistros();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Aoo\Http\Requests\CriarRegistroDeCaixaRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CriarRegistroDeCaixaRequest $request)
    {
        RegistroDeCaixa::createMain($request->validated());
        return response()->json('Registro de caixa criado com sucesso', 201);
    }

    protected function resourceAbilityMap()
    {
        return [
            'index' => 'viewAny',
            'registrosAnuais' => 'viewAny',
            'todosGastosAnuais' => 'viewAny',
            'gastosAnuaisEquipe' => 'viewAny',
            'anosDisponiveis' => 'viewAny',
            'fluxoAnual' => 'viewAny',
            'store' => 'create'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return ['index', 'registrosAnuais', 'todosGastosAnuais', 'gastosAnuaisEquipe', 'anosDisponiveis', 'fluxoAnual', 'store'];
    }
}
