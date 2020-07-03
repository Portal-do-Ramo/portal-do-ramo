<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class Arquivo extends BaseModel
{
    use UsesUuid;

    protected $appends = ['ultima_modificacao'];

    protected $hidden = ['path'];

    public function relacionado()
    {
        return $this->morphTo(__FUNCTION__, 'tipo_relacionado', 'id_relacionado');
    }

    public function getUltimaModificacaoAttribute()
    {
        $arquivo = Storage::cloud()->get($this->path);
        return $arquivo ? Carbon::parse(date('Y-m-d H:i:s', Storage::cloud()->lastModified($this->path)))->diffForHumans() : NULL;
    }

    public function getArquivoParaDownload()
    {
        return Storage::cloud()->get($this->path);
    }
}
