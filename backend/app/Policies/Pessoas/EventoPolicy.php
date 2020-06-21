<?php

namespace App\Policies\Pessoas;

use App\Models\Evento;
use App\Models\UsuarioSistema;
use Illuminate\Auth\Access\HandlesAuthorization;

class EventoPolicy
{
    use HandlesAuthorization;

    public function before(UsuarioSistema $usuarioSistema, $ability)
    {
        if($usuarioSistema->isPresidencia())
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
     * @param  \App\Models\Evento  $evento
     * @return mixed
     */
    public function update(UsuarioSistema $usuarioSistema, Evento $evento)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\UsuarioSistema  $usuarioSistema
     * @param  \App\Models\Evento  $evento
     * @return mixed
     */
    public function delete(UsuarioSistema $usuarioSistema, Evento $evento)
    {
        //
    }
}
