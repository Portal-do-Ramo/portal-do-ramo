<?php

namespace App\Policies\Pessoas;

use App\Models\UsuarioSistema;
use App\Traits\PessoasPolicies;
use Illuminate\Auth\Access\HandlesAuthorization;

class FeedbackPolicy
{
    use HandlesAuthorization, PessoasPolicies;

    /**
     * Determine whether the user can view any feedback.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function viewAny(UsuarioSistema $user)
    {
        //
    }
}
