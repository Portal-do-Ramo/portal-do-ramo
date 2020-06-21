<?php

namespace App\Policies\Projetos;

use App\Models\Projeto;
use App\Models\UsuarioSistema;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjetoPolicy
{
    use HandlesAuthorization;

    public function viewAny(UsuarioSistema $user)
    {
        return $user->isPresidencia() or $user->isDiretor('de Projetos');
    }

    public function view(UsuarioSistema $user, Projeto $projeto)
    {
        return $projeto->matriculaMembrosAtivosPertencentes()->contains($user->matricula) or $projeto->equipe->matriculaMembrosSuperiores()->contains($user->matricula) or $user->isPresidencia() or $user->isDiretor('de Projetos');
    }

    /**
     * Determine whether the user can view the projeto.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Projeto  $projeto
     * @return mixed
     */
    public function viewFully(UsuarioSistema $user, Projeto $projeto)
    {
        return $projeto->matriculaTodosMembrosSuperiores()->contains($user->matricula) or $user->isPresidencia() or $user->isDiretor('de Projetos');
    }

    /**
     * Determine whether the user can create projetos.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function create(UsuarioSistema $user)
    {
        return $user->isPresidencia() or $user->isDiretor('de Projetos');
    }

    /**
     * Determine whether the user can update the projeto.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Projeto  $projeto
     * @return mixed
     */
    public function update(UsuarioSistema $user, Projeto $projeto)
    {
        return $projeto->matriculaTodosMembrosSuperiores()->contains($user->matricula) or $user->isPresidencia() or $user->isDiretor('de Projetos');
    }

    public function gerenciarRelacionado(UsuarioSistema $user, Projeto $projeto)
    {
        return $user->isPresidencia() or $user->isDiretor('de Projetos') or $projeto->matriculaTodosMembrosSuperiores()->contains($user->matricula);
    }
}
