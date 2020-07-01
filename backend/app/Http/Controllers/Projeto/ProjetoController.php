<?php

namespace App\Http\Controllers\Projeto;

use App\Repositories\Interfaces\ProjetoRepositoryInterface;
use App\Http\Requests\Projeto\AtualizarProjetoRequest;
use App\Http\Requests\Projeto\CriarProjetoRequest;
use App\Http\Resources\ProjetoCompletoResource;
use App\Http\Resources\ProjetoMembroResource;
use App\Http\Resources\ProjetoResource;
use App\Models\Projeto;
use Illuminate\Http\Request;

class ProjetoController extends AbstractProjetoController
{
    public function __construct(ProjetoRepositoryInterface $projetoRepository)
    {
        parent::__construct($projetoRepository);
        $this->authorizeResource(Projeto::class, 'projeto');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->projetoRepository->index();
    }

    public function selectProjetos()
    {
        return $this->projetoRepository->selectProjetos();
    }

    public function selectProjetosPSI()
    {
        return $this->projetoRepository->selectProjetosPSI();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CriarProjetoRequest $request)
    {
        $this->projetoRepository->create($request->validated());

        return response()->json('Projeto criado com sucesso', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Projeto  $projeto
     * @return \Illuminate\Http\Response
     */
    public function show(Projeto $projeto)
    {
        return new ProjetoResource($projeto, $this->projetoRepository);
    }

    public function showMember(Projeto $projeto)
    {
        return new ProjetoMembroResource($projeto, $this->projetoRepository);
    }

    public function showFully(Projeto $projeto)
    {
        return new ProjetoCompletoResource($projeto, $this->projetoRepository);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Projeto  $projeto
     * @return \Illuminate\Http\Response
     */
    public function update(AtualizarProjetoRequest $request, Projeto $projeto)
    {
        $this->projetoRepository->update($projeto, $request->validated());
        return response()->json('Projeto atualizado com sucesso', 200);
    }

    public function atualizarAreas(Request $request, Projeto $projeto)
    {
        $this->projetoRepository->updateAreas($projeto, $request->validate(['areas' => 'array']));
        return response()->json('Áreas do projeto atualizada com sucesso', 200);
    }

    public function destroy(Projeto $projeto)
    {
        $this->projetoRepository->fecharProjeto($projeto);
        return response()->json("Projeto {$projeto->nome_projeto} fechado com sucesso", 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'index' => 'viewAny',
            'showMember' => 'view',
            'showFully' => 'viewFully',
            'update' => 'update',
            'atualizarAreas' => 'update',
            'destroy' => 'delete'
        ];
    }
}
