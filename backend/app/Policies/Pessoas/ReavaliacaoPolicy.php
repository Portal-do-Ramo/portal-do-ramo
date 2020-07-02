<?php

namespace App\Policies\Pessoas;

use App\Models\Reavaliacao;
use App\Models\Usuario;
use App\Models\UsuarioSistema;
use App\Traits\PessoasPolicies;
use Illuminate\Auth\Access\HandlesAuthorization;

class ReavaliacaoPolicy
{
    use HandlesAuthorization, PessoasPolicies;

    /**
     * Determine whether the user can view any reavaliacaos.
     *
     * @param  \App\Models\Usuario  $user
     * @return mixed
     */
    public function viewAny(UsuarioSistema $user)
    {
        //
    }

    /**
     * Determine whether the user can view the reavaliacao.
     *
     * @param  \App\Models\Usuario  $user
     * @param  \App\Models\Reavaliacao  $reavaliacao
     * @return mixed
     */
    public function view(UsuarioSistema $user, Reavaliacao $reavaliacao)
    {
        //
    }

    /**
     * Determine whether the user can delete the reavaliacao.
     *
     * @param  \App\Models\Usuario  $user
     * @param  \App\Models\Reavaliacao  $reavaliacao
     * @return mixed
     */
    public function delete(UsuarioSistema $user, Reavaliacao $reavaliacao)
    {
        //
    }
}
