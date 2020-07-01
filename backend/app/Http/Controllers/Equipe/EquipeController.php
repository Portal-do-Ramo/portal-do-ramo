<?php

namespace App\Http\Controllers\Equipe;

use App\Http\Requests\Equipe\AtualizarAssessorRequest;
use App\Http\Requests\Equipe\AtualizarCoordenadorRequest;
use App\Models\Equipe;
use App\Http\Requests\Equipe\CriarEquipeRequest;
use App\Http\Requests\Equipe\AtualizarEquipeRequest;
use App\Http\Requests\Equipe\AtualizarLogoEquipeRequest;
use App\Http\Resources\EquipeCompletaResource;
use App\Http\Resources\EquipeMembroResource;
use App\Http\Resources\EquipeResource;
use App\Jobs\AlterarLogoEquipeJob;
use App\Jobs\CriarEquipeJob;
use App\Repositories\Interfaces\EquipeRepositoryInterface;
use App\Services\DeletarArquivoService;
use App\Services\VerificarExistenciaDiretorioService;

class EquipeController extends AbstractEquipeController
{
    public function __construct(EquipeRepositoryInterface $equipeRepository)
    {
        parent::__construct($equipeRepository);
        $this->authorizeResource(Equipe::class, 'equipe');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->equipeRepository->index();
    }

    public function selectEquipes()
    {
        return $this->equipeRepository->selectEquipes();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CriarEquipeRequest $request, VerificarExistenciaDiretorioService $service)
    {
        CriarEquipeJob::dispatchNow($request->validated(), $this->equipeRepository, $service);
        return response()->json('Equipe registrada com sucesso', 201);
    }

    public function show(Equipe $equipe)
    {
        return new EquipeResource($equipe, $this->equipeRepository);
    }

    public function showMember(Equipe $equipe)
    {
        return new EquipeMembroResource($equipe, $this->equipeRepository);
    }

    public function showFully(Equipe $equipe)
    {
        return new EquipeCompletaResource($equipe, $this->equipeRepository);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Equipe  $equipe
     * @return \Illuminate\Http\Response
     */
    public function update(AtualizarEquipeRequest $request, Equipe $equipe)
    {
        $this->equipeRepository->update($equipe,  $request->validated());
        return response()->json('Equipe atualizada com sucesso', 200);
    }

    public function updateCoordenador(AtualizarCoordenadorRequest $request, Equipe $equipe)
    {
        $equipe->mudarCoordenador($request->validated()['matricula_coordenador']);
        return response()->json('Coordenador da equipe mudado com sucesso');
    }

    public function updateAssessor(AtualizarAssessorRequest $request, Equipe $equipe)
    {
        $equipe->mudarAssessor($request->validated()['matricula_assessor']);
        return response()->json('Assessor da equipe mudado com sucesso');
    }

    public function updateLogo(AtualizarLogoEquipeRequest $request, Equipe $equipe, VerificarExistenciaDiretorioService $service, DeletarArquivoService $deletarService)
    {
        AlterarLogoEquipeJob::dispatchNow($equipe, $request->validated(), $this->equipeRepository, $service, $deletarService);       
        return response()->json('Logo da equipe alterado com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'index' => 'viewAny',
            'store' => 'create',
            'updateCoordenador' => 'create',
            'showMember' => 'view',
            'showFully' => 'viewFully',
            'update' => 'update', 
            'updateLogo' => 'update',
            'updateAssessor' => 'update'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return ['index', 'store', 'updateCoordenador'];
    }
}
