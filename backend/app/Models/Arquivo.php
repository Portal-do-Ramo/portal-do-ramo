<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Support\Facades\Storage;

class Arquivo extends BaseModel
{
    use UsesUuid;

    public function getArquivo()
    {
        $file = collect(Storage::cloud()->listContents($this->path))->where('type', 'file')->where('filename', $this->nome)->first();
        return $file ? Storage::cloud()->get($file['path']) : NULL;
    }

    public function relacionado()
    {
        return $this->morphTo(__FUNCTION__, 'tipo_relacionado', 'id_relacionado');
    }
}
