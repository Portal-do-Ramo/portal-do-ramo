<?php

namespace App\Policies\Financeiro;

use App\Models\UsuarioSistema;
use App\Models\Vaquinha;
use Illuminate\Auth\Access\HandlesAuthorization;

class VaquinhaPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any vaquinhas.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function viewAny(UsuarioSistema $user)
    {
        return $user->isPresidencia() or $user->isDiretor('Financeiro');
    }

    /**
     * Determine whether the user can create vaquinhas.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function create(UsuarioSistema $user)
    {
        return $user->isPresidencia() or $user->isDiretor('Financeiro');
    }

    public function adicionarDoacao(UsuarioSistema $user, Vaquinha $vaquinha)
    {
        return ($user->isPresidencia() or $user->isDiretor('Financeiro') or $user->assessor) and $vaquinha->aberto;
    }

    public function viewLast(UsuarioSistema $user)
    {
        return $user->isPresidencia() or $user->isDiretor('Financeiro') or $user->assessor;
    }
}
