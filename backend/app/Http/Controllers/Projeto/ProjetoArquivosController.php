<?php

namespace App\Http\Controllers\Projeto;

use App\Http\Requests\Arquivo\AtualizarArquivoRequest;
use App\Http\Requests\Arquivo\CriarArquivoProjetoRequest;
use App\Jobs\DeletarArquivoJob;
use App\Jobs\EditarArquivoProjetoJob;
use App\Jobs\UploadArquivoProjetoJob;
use App\Models\Arquivo;
use App\Models\Projeto;
use App\Repositories\Interfaces\ProjetoRepositoryInterface;
use App\Services\DeletarArquivoService;
use App\Services\VerificarExistenciaDiretorioService;

class ProjetoArquivosController extends AbstractProjetoController
{
    public function __construct(ProjetoRepositoryInterface $projetoRepository)
    {
        parent::__construct($projetoRepository);
        $this->authorizeResource(Projeto::class, 'projeto');
    }

    public function store(CriarArquivoProjetoRequest $request, Projeto $projeto, VerificarExistenciaDiretorioService $service)
    {
        UploadArquivoProjetoJob::dispatch($projeto, $request->validated(), $this->projetoRepository, $service);
        return response()->json('Upload do arquivo feito com sucesso', 200);
    }

    public function update(AtualizarArquivoRequest $request, Projeto $projeto, Arquivo $arquivo, VerificarExistenciaDiretorioService $service)
    {
        EditarArquivoProjetoJob::dispatch($projeto, $arquivo, $request->validated(), $service);
        return response()->json("$arquivo->nome alterado com sucesso", 200);
    }

    public function destroy(Projeto $projeto, Arquivo $arquivo, DeletarArquivoService $deleteService)
    {
        DeletarArquivoJob::dispatch($arquivo, $deleteService);
        return response()->json('Arquivo removido com sucesso', 200);
    }

    protected function resourceAbilityMap()
    {
        return [
            'store' => 'gerenciarRelacionado',
            'update' => 'gerenciarRelacionado',
            'destroy' => 'gerenciarRelacionado'
        ];
    }

    protected function resourceMethodsWithoutModels()
    {
        return [];
    }
}
