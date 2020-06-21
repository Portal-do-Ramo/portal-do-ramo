<?php

namespace App\Broadcasting\Strike;

use App\Models\Strike;
use App\Models\UsuarioSistema;

class TodosStrikesChannel
{
    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return array|bool
     */
    public function join(UsuarioSistema $user)
    {
        return $user->can('viewAny', Strike::class);
    }
}
