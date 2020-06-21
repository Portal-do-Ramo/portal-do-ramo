<?php

namespace App\Broadcasting\Falta;

use App\Models\Falta;
use App\Models\UsuarioSistema;

class FaltaUsuarioChannel
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
        return $user->matricula === $matricula or $user->can('viewAny', Falta::class);
    }
}
