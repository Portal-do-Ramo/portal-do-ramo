<?php

namespace App\Http\Controllers\Parceria;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Parceria\CriarRegistroParceriaRequest;
use App\Models\Parceria;
use App\Repositories\Interfaces\ParceriaRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class ParceriaController extends ApiController
{
    protected $parceriaRepository;

    public function __construct(ParceriaRepositoryInterface $parceriaRepository)
    {
        parent::__construct();
        $this->parceriaRepository = $parceriaRepository;
        $this->authorizeResource(Parceria::class, 'parceria');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->parceriaRepository->index();
    }

    public function indexPublicas()
    {
        return $this->parceriaRepository->indexPublicas();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CriarRegistroParceriaRequest $request)
    {
        $this->parceriaRepository->create($request->validated());
        return response()->json('Sugestão de parceria enviada com sucesso', 200);
    }

    public function storeConsolidada(CriarRegistroParceriaRequest $request)
    {
        $this->parceriaRepository->create($request->validated() + ['consolidada' => true]);
        return response()->json('Registro de parceria consolidada criada com sucesso', 200);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Parceria  $parceria
     * @return \Illuminate\Http\Response
     */
    public function update(CriarRegistroParceriaRequest $request, Parceria $parceria)
    {
        $this->parceriaRepository->update($parceria, $request->validated() + ['membro_solicitou' => Auth::id()]);
        return response()->json('Registro de parceria atualizada com sucesso', 200);
    }

    public function consolidar(Parceria $parceria)
    {
        return response()->json('Registro de parceria consolidado com sucesso', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Parceria  $parceria
     * @return \Illuminate\Http\Response
     */
    public function destroy(Parceria $parceria)
    {
        $this->parceriaRepository->delete($parceria);
        return response()->json('Registro de parceria deletado com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'index' => 'viewAny',
            'storeConsolidada' => 'create',
            'update' => 'update',
            'destroy' => 'delete'
        ];
    }
}
