<?php

namespace App\Traits;

use App\Models\Usuario;

trait ProjetosPolicies
{
    public function before(Usuario $user, $ability)
    {
        if($user->isPresidencia() or $user->isDiretor('de Projetos'))
            return true;
    }
}
