<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class VerificarExistenciaDiretorioService
{
    public function handle(string $diretorioBuscado, string $diretorioInicial = '/')
    {
        if(!$pasta = collect(Storage::cloud()->listContents($diretorioInicial, false))->where('type', 'dir')->where('filename', $diretorioBuscado)->first()) {
            Storage::cloud()->makeDirectory("$diretorioInicial/$diretorioBuscado");
            return collect(Storage::cloud()->listContents($diretorioInicial, false))->where('type', 'dir')->where('filename', $diretorioBuscado)->first()['path'];
        }

        return $pasta['path'];
    }
}