<?php

namespace App\Traits;

use App\Models\UsuarioSistema;

trait FinanceiroPolicies
{
    public function before(UsuarioSistema $usuario, $ability)
    {
        if($usuario->isPresidencia() or $usuario->isDiretor('Financeiro'))
            return true;
    }
}