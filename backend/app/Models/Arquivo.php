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
        $arquivo = $this->getIdArquivo();
        return $arquivo ? Carbon::parse(date('Y-m-d H:i:s', Storage::cloud()->lastModified($arquivo['path'])))->diffForHumans() : NULL;
    }

    public function getArquivoParaDownload()
    {
        $arquivo = $this->getIdArquivo();
        return $arquivo ? Storage::cloud()->get($arquivo['path']) : NULL;
    }

    private function getIdArquivo()
    {
        return collect(Storage::cloud()->listContents($this->path))->where('type', 'file')->where('filename', $this->nome)->first();
    }
}
