<?php

namespace App\Policies\Financeiro;

use App\Models\Caixa;
use App\Models\UsuarioSistema;
use App\Traits\FinanceiroPolicies;
use Illuminate\Auth\Access\HandlesAuthorization;

class CaixaPolicy
{
    use HandlesAuthorization, FinanceiroPolicies;

    /**
     * Determine whether the user can update the caixa.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Caixa  $caixa
     * @return mixed
     */
    public function update(UsuarioSistema $user, Caixa $caixa)
    {
        //
    }
}
