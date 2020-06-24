<?php

namespace App\Http\Controllers\Arquivo;

use App\Http\Controllers\Controller;
use App\Models\Arquivo;

class DownloadArquivoController extends Controller
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
        return $conteudo ? response($conteudo) : response()->json('Arquivo não encontrado no Drive', 404);
    }
}
