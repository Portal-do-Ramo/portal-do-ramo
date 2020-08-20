<?php

namespace App\Filtros;

class NomeCompleto extends BaseFiltro
{
    protected function aplicarFiltro()
    {
        return fn($query) => $query->where($this->getNomeFiltro(), 'LIKE', $this->argumentoLike(request($this->getNomeFiltro())));
    }

    private function argumentoLike($valorRequest)
    {
        return implode('', array_map(fn($value) => "%{$value}", explode(' ', $valorRequest))) . '%';
    }
}
