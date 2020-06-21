<?php

namespace App\Filtros;

class NomeCompleto extends BaseFiltro
{
    protected function aplicarFiltro()
    {
        return fn($query) => $query->where($this->getNomeFiltro(), 'REGEXP', request($this->getNomeFiltro()));
    }
}