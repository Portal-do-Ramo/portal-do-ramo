<?php

namespace App\Broadcasting\Strike;

use App\Models\UsuarioSistema;

class StrikeUsuarioChannel
{
    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return array|bool
     */
    public function join(UsuarioSistema $user, $matricula)
    {
        return $user->matricula === $matricula;
    }
}
