<?php

namespace App\Policies\Marketing;

use App\Models\Parceria;
use App\Models\UsuarioSistema;
use Illuminate\Auth\Access\HandlesAuthorization;

class ParceriaPolicy
{
    use HandlesAuthorization;

    public function before(UsuarioSistema $user, $ability)
    {
        if($user->isPresidencia() or $user->isDiretor('de Marketing') or $user->maketing)
            return true;
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\UsuarioSistema  $usuarioSistema
     * @return mixed
     */
    public function viewAny(UsuarioSistema $usuarioSistema)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\UsuarioSistema  $usuarioSistema
     * @return mixed
     */
    public function create(UsuarioSistema $usuarioSistema)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\UsuarioSistema  $usuarioSistema
     * @param  \App\Models\Parceria  $parceria
     * @return mixed
     */
    public function update(UsuarioSistema $usuarioSistema, Parceria $parceria)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\UsuarioSistema  $usuarioSistema
     * @param  \App\Models\Parceria  $parceria
     * @return mixed
     */
    public function delete(UsuarioSistema $usuarioSistema, Parceria $parceria)
    {
        //
    }
}
