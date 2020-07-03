<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class BuscarNovoArquivoService
{
    public function handle(string $pathPastaArquivo, string $nomeArquivo)
    {
        return collect(Storage::cloud()->listContents($pathPastaArquivo))->where('type', 'file')->where('filename', $nomeArquivo)->first();
    }
}