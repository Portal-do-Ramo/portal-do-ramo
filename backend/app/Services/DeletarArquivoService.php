<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class DeletarArquivoService
{
    public function handle(string $path, string $nomeArquivo)
    {
        if($arquivo = collect(Storage::cloud()->listContents($path, false))->where('type', 'file')->where('filename', $nomeArquivo)->first()) Storage::cloud()->delete($arquivo['path']);
    }
}