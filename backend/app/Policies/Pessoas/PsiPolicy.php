<?php

namespace App\Policies\Pessoas;

use App\Models\Psi;
use App\Models\UsuarioSistema;
use App\Traits\PessoasPolicies;
use Illuminate\Auth\Access\HandlesAuthorization;

class PsiPolicy
{
    use HandlesAuthorization, PessoasPolicies;

    /**
     * Determine whether the user can view the psi.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Psi  $psi
     * @return mixed
     */
    public function view(UsuarioSistema $user, Psi $psi)
    {
        return ($user->equipeCoordena()->count() != 0);
    }

    /**
     * Determine whether the user can create psis.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function create(UsuarioSistema $user)
    {
        //
    }

    /**
     * Determine whether the user can update the psi.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Psi  $psi
     * @return mixed
     */
    public function update(UsuarioSistema $user, Psi $psi)
    {
        //
    }

    /**
     * Determine whether the user can delete the psi.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Psi  $psi
     * @return mixed
     */
    public function delete(UsuarioSistema $user, Psi $psi)
    {
        //
    }
}
