<?php

namespace App\Policies\Pessoas;

use App\Models\Falta;
use App\Models\UsuarioSistema;
use App\Traits\PessoasPolicies;
use Illuminate\Auth\Access\HandlesAuthorization;

class FaltaPolicy
{
    use HandlesAuthorization, PessoasPolicies;

    /**
     * Determine whether the user can view any faltas.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function viewAny(UsuarioSistema $user)
    {
        //
    }

    /**
     * Determine whether the user can create faltas.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function create(UsuarioSistema $user)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the falta.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Falta  $falta
     * @return mixed
     */
    public function delete(UsuarioSistema $user, Falta $falta)
    {
        //
    }
}
