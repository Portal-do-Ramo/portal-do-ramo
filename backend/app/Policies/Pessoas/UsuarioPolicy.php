<?php

namespace App\Policies\Pessoas;

use App\Models\Usuario;
use App\Models\UsuarioSistema;
use Illuminate\Auth\Access\HandlesAuthorization;

class UsuarioPolicy
{
    use HandlesAuthorization;

    public function before(UsuarioSistema $user, $ability)
    {
        if(($user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas')) and $ability != 'firstUpdate')
            return true;
    }

    public function viewAny(UsuarioSistema $user)
    {
        //
    }
    
    /**
     * Determine whether the user can view the Usuario.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Usuario  $Usuario
     * @return mixed
     */
    public function viewFully(UsuarioSistema $user, Usuario $membro)
    {
       return $user->is($membro);
    }

    /**
     * Determine whether the user can create Usuarios.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function create(UsuarioSistema $user)
    {
        //
    }

    /**
     * Determine whether the user can update the Usuario.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Usuario  $membro
     * @return mixed
     */
    public function update(UsuarioSistema $user, Usuario $membro)
    {
        return $user->is($membro);
    }

    /**
     * Determina se o usuário pode fazer o update de informações além daquelas permitidas no update normal
     *
     * @param App\Models\UsuarioSistema $user
     * @param App\Models\Usuario $membro
     * @return boolean
     */
    public function updateFully(UsuarioSistema $user, Usuario $membro)
    {
        return $user->assessor;
    }

    /**
     * Determina se o usuário pode relaizar a ação de primeiro login
     *
     * @param App\Models\UsuarioSistema $user
     * @param App\Models\Usuario $membro
     * @return boolean
     */
    public function firstUpdate(UsuarioSistema $user, Usuario $membro)
    {
        return $user->is($membro) and !$user->ativo;
    }

    /**
     * Determine whether the user can delete the Usuario.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Usuario  $membro
     * @return mixed
     */
    public function delete(UsuarioSistema $user, Usuario $membro)
    {
        //
    }
}
