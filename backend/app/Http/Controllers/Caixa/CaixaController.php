<?php

namespace App\Http\Controllers\Caixa;

use App\Http\Controllers\ApiController;
use App\Models\Caixa;
use App\Repositories\Interfaces\CaixaRepositoryInterface;
use Illuminate\Http\Request;

class CaixaController extends ApiController
{
    protected $caixaRepository;

    public function __construct(CaixaRepositoryInterface $caixaRepository)
    {
        parent::__construct();
        $this->caixaRepository = $caixaRepository;
        $this->authorizeResource(Caixa::class, 'caixa');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->caixaRepository->index();
    }

    public function infosGerais()
    {
        return $this->caixaRepository->infoGeralCaixa();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Caixa  $caixa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Caixa $caixa)
    {
        $this->caixaRepository->updateManual($caixa, $request->validate(['porcentagem_orcamento' => 'required|numeric', 'valor' => 'required|numeric']));
        return response()->json('Porcentagem de orçamento do caixa atualizado com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'update' => 'update'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return [];
    }
}
