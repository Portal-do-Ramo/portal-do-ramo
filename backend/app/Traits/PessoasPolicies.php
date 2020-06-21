<?php

namespace App\Traits;

use App\Models\Usuario;

trait PessoasPolicies
{
    public function before(Usuario $user, $ability)
    {
        if($user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas'))
            return true;
    }
}
