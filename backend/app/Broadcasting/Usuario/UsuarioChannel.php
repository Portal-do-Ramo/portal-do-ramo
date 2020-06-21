<?php

namespace App\Broadcasting\Usuario;

use App\Models\UsuarioSistema;

class UsuarioChannel
{
    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  string $matricula
     * @return array|bool
     */
    public function join(UsuarioSistema $user, $matricula)
    {
        return $user->matricula === $matricula;
    }
}
