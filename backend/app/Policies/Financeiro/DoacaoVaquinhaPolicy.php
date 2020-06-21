<?php

namespace App\Policies\Financeiro;

use App\Models\UsuarioSistema;
use Illuminate\Auth\Access\HandlesAuthorization;

class DoacaoVaquinhaPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function viewAny(UsuarioSistema $user)
    {
        return $user->isPresidencia() or $user->isDiretor('Financeiro');
    }
}
