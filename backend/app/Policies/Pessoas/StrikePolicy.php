<?php

namespace App\Policies\Pessoas;

use App\Models\UsuarioSistema;
use App\Models\Strike;
use Illuminate\Auth\Access\HandlesAuthorization;

class StrikePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any strikes.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @return mixed
     */
    public function viewAny(UsuarioSistema $user)
    {
        return $user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas');
    }

    /**
     * Determine whether the user can update the strike.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Strike  $strike
     * @return mixed
     */
    public function aprovar(UsuarioSistema $user, Strike $strike)
    {
        return ($user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas')) and !$strike->aprovado;
    }

    public function manter(UsuarioSistema $user, Strike $strike)
    {
        return ($user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas')) and $strike->aprovado;
    }

    public function solicitarAudiencia(UsuarioSistema $user, Strike $strike)
    {
        return $user->is($strike->membroRecebeu) and today()->diffInDays($strike->data_aprovado) < 7 and !$strike->audiencia_solicitada and $strike->aprovado;
    }

    public function marcarAudiencia(UsuarioSistema $user, Strike $strike)
    {
        return ($user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas')) and !$strike->audiencia_marcada;
    }

    public function remarcarAudiencia(UsuarioSistema $user, Strike $strike)
    {
        return ($user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas')) and $strike->audiencia_marcada;
    }

    public function desmarcarAudiencia(UsuarioSistema $user, Strike $strike)
    {
        return ($user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas')) and $strike->audiencia_marcada and today() < $strike->data_audiencia; 
    }

    /**
     * Determine whether the user can delete the strike.
     *
     * @param  \App\Models\UsuarioSistema  $user
     * @param  \App\Models\Strike  $strike
     * @return mixed
     */
    public function delete(UsuarioSistema $user, Strike $strike)
    {
        return $user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas');
    }

    public function adicionarReavaliacao(UsuarioSistema $user, Strike $strike)
    {
        return $user->isPresidencia() or $user->isDiretor('de Gestão de Pessoas') and $strike->aprovado;
    }
}
