<?php

namespace App\Policies\Pessoas;

use App\Models\Reavaliacao;
use App\Models\Usuario;
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
    public function viewAny(Usuario $user)
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
    public function view(Usuario $user, Reavaliacao $reavaliacao)
    {
        //
    }

    /**
     * Determine whether the user can create reavaliacaos.
     *
     * @param  \App\Models\Usuario  $user
     * @return mixed
     */
    public function create(Usuario $user)
    {
        //
    }

    /**
     * Determine whether the user can update the reavaliacao.
     *
     * @param  \App\Models\Usuario  $user
     * @param  \App\Models\Reavaliacao  $reavaliacao
     * @return mixed
     */
    public function update(Usuario $user, Reavaliacao $reavaliacao)
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
    public function delete(Usuario $user, Reavaliacao $reavaliacao)
    {
        //
    }

    /**
     * Determine whether the user can restore the reavaliacao.
     *
     * @param  \App\Models\Usuario  $user
     * @param  \App\Models\Reavaliacao  $reavaliacao
     * @return mixed
     */
    public function restore(Usuario $user, Reavaliacao $reavaliacao)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the reavaliacao.
     *
     * @param  \App\Models\Usuario  $user
     * @param  \App\Models\Reavaliacao  $reavaliacao
     * @return mixed
     */
    public function forceDelete(Usuario $user, Reavaliacao $reavaliacao)
    {
        //
    }
}
