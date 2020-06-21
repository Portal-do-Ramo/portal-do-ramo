<?php

namespace App\Http\Controllers\Psi;

use App\Http\Controllers\ApiController;
use App\Http\Requests\Psi\SeInscreverPsiRequest;
use App\Models\InscricaoPsi;
use App\Repositories\Interfaces\InscricaoPsiRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class InscricaoPsiController extends ApiController
{
    protected $inscricaoRepository;
    public function __construct(InscricaoPsiRepositoryInterface $inscricaoRepository)
    {
        parent::__construct();
        $this->inscricaoRepository = $inscricaoRepository;
        $this->authorizeResource(InscricaoPsi::class, 'inscricao');
    }

    public function store(SeInscreverPsiRequest $request)
    {
        $dadosValidos = $request->validated();
        $dadosValidos['usuario'] = Auth::id();

        $this->authorize('store', [InscricaoPsi::class, $dadosValidos]);


        $this->inscricaoRepository->inscrever($dadosValidos);
        return response()->json('Inscrição efetuada com sucesso', 200);
    }

    public function destroy(InscricaoPsi $inscricao)
    {
        if($this->inscricaoRepository->desinscrever($inscricao))
            return response()->json('Desinscrição efetuada com sucesso', 200);

        return response()->json('Inscrição não existe na base de dados', 400);
    }


    public function aprovarInscricao(InscricaoPsi $inscricao)
    {
        $this->inscricaoRepository->atualizarCondicao($inscricao, 'Aprovado');
        return response()->json("Inscrição aprovada com sucesso", 200);
    }


    public function reprovarInscricao(InscricaoPsi $inscricao)
    {
        $this->inscricaoRepository->atualizarCondicao($inscricao, 'Reprovado');
        return response()->json("Inscrição reprovada com sucesso", 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'destroy' => 'delete',
            'aprovarInscricao' => 'validarInscricao',
            'reprovarInscricao' => 'validarInscricao',
        ];
    }
}
