<?php

namespace App\Http\Controllers\Vaquinha;

use App\Http\Requests\Vaquinha\CriarDoacaoVaquinhaRequest;
use App\Http\Requests\Vaquinha\CriarVaquinhaRequest;
use App\Models\Vaquinha;
use App\Repositories\Interfaces\VaquinhaRepositoryInterface;

class VaquinhaController extends AbstractVaquinhaController
{
    public function __construct(VaquinhaRepositoryInterface $vaquinhaRepository)
    {
        parent::__construct($vaquinhaRepository);
        $this->authorizeResource(Vaquinha::class, 'vaquinha');
    }

    public function index()
    {
        return $this->vaquinhaRepository->index();
    }

    public function store(CriarVaquinhaRequest $request)
    {
        $this->vaquinhaRepository->create($request->validated());
        return response()->json('Registro de vaquinha criado com sucesso', 201);
    }

    public function adicionarDoacao(CriarDoacaoVaquinhaRequest $request, Vaquinha $vaquinha)
    {
        $this->vaquinhaRepository->addDoacao($vaquinha, $request->validated());
        return response()->json('Registro de doação para a vaquinha criado com sucesso', 201);
    }

    public function vaquinhaAbertaAtual()
    {
        return $this->vaquinhaRepository->getLast();
    }

    protected function resourceAbilityMap()
    {
        return [
            'index' => 'viewAny',
            'store' => 'create',
            'adicionarDoacao' => 'adicionarDoacao',
            'vaquinhaAbertaAtual' => 'viewLast'
        ];
    }
    
    protected function resourceMethodsWithoutModels()
    {
        return ['index', 'store', 'vaquinhaAbertaAtual'];
    }
}
