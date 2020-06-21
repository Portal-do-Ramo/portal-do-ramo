<?php

namespace App\Policies\Projetos;

use App\Models\Equipe;
use App\Models\UsuarioSistema;
use App\Traits\ProjetosPolicies;
use Illuminate\Auth\Access\HandlesAuthorization;

class EquipePolicy
{
    use HandlesAuthorization, ProjetosPolicies;

    /**
     * Determine whether the user can view any equipes.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function viewAny(UsuarioSistema $user)
    {
        //
    }

    public function view(UsuarioSistema $user, Equipe $equipe)
    {
        return $equipe->matriculaMembrosPertencentes()->contains($user->matricula);
    }

    /**
     * Determine whether the user can view the equipe.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Equipe  $equipe
     * @return mixed
     */
    public function viewFully(UsuarioSistema $user, Equipe $equipe)
    {
        return $equipe->matriculaMembrosSuperiores()->contains($user->matricula);
    }

    /**
     * Determine whether the user can create equipes.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function create(UsuarioSistema $user)
    {
        //
    }

    /**
     * Determine whether the user can update the equipe.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Equipe  $equipe
     * @return mixed
     */
    public function update(UsuarioSistema $user, Equipe $equipe)
    {
        return $equipe->matriculaMembrosSuperiores()->contains($user->matricula);
    }

    public function gerenciarRelacionado(UsuarioSistema $user, Equipe $equipe)
    {
        return $equipe->matriculaMembrosSuperiores()->contains($user->matricula);
    }
}
