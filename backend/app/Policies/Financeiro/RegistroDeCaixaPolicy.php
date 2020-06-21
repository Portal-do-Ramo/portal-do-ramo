<?php

namespace App\Policies\Financeiro;

use App\Models\UsuarioSistema;
use App\Traits\FinanceiroPolicies;
use Illuminate\Auth\Access\HandlesAuthorization;

class RegistroDeCaixaPolicy
{
    use HandlesAuthorization, FinanceiroPolicies;

    /**
     * Determine whether the user can view any registro caixas.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function viewAny(UsuarioSistema $user)
    {
        //
    }

    /**
     * Determine whether the user can create registro caixas.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function create(UsuarioSistema $user)
    {
        //
    }
}
