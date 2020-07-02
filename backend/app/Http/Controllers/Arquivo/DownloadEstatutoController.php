<?php

namespace App\Http\Controllers\Arquivo;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Services\VerificarExistenciaDiretorioService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DownloadEstatutoController extends ApiController
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, VerificarExistenciaDiretorioService $service)
    {
        $pasta = $service->handle('Documentos Gerais');
        $arquivo = collect(Storage::cloud()->listContents($pasta))->filter(fn($value) => preg_match('/Estatuto Ramo Estudantil IEEE CEFET-RJ/', $value['filename']))->sortBy(fn($item) => $item['timestamp'], null, true)->first();   

        return $arquivo ? Storage::cloud()->download($arquivo['path']) : response()->json('Arquivo não encontrado no Drive, informe um dos membros da diretoria', 404);
    }
}
