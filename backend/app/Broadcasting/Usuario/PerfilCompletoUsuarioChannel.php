<?php

namespace App\Broadcasting\Usuario;

use App\Models\Usuario;
use App\Models\UsuarioSistema;

class PerfilCompletoUsuarioChannel
{
    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Usuario $usuario
     * @return array|bool
     */
    public function join(UsuarioSistema $user, Usuario $usuario)
    {
        return $user->can('viewFully', $usuario);
    }
}
