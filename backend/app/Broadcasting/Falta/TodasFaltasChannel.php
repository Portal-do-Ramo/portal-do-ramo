<?php

namespace App\Broadcasting\Falta;

use App\Models\Falta;
use App\Models\UsuarioSistema;

class TodasFaltasChannel
{
    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return array|bool
     */
    public function join(UsuarioSistema $user)
    {
        return $user->can('viewAny', Falta::class);
    }
}
