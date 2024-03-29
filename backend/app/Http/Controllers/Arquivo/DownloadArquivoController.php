<?php

namespace App\Http\Controllers\Arquivo;

use App\Http\Controllers\ApiController;
use App\Models\Arquivo;
use Illuminate\Support\Facades\Storage;

class DownloadArquivoController extends ApiController
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Arquivo $arquivo)
    {
        $conteudo = $arquivo->getArquivoParaDownload();
        return $conteudo ? Storage::cloud()->download($arquivo->path) : response()->json('Arquivo não encontrado no Drive', 404);
    }
}
