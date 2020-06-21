<?php

namespace App\Observers;

use App\Models\InscricaoPsi;
use App\Notifications\Psi\PsiInscricaoAvaliadaNotification;
use App\Notifications\Psi\PsiInscricaoDesinscricaoNotification;

class InscricaoPsiObserver
{
    public function created(InscricaoPsi $inscricao)
    {
        $inscricao->membro->notify(new PsiInscricaoDesinscricaoNotification($inscricao, 'inscrição'));
    }

    public function updated(InscricaoPsi $inscricao)
    {
        $inscricao->membro->notify(new PsiInscricaoAvaliadaNotification($inscricao));
    }

    public function deleted(InscricaoPsi $inscricao)
    {
        $inscricao->membro->notify(new PsiInscricaoDesinscricaoNotification($inscricao, 'desinscrição'));
    }
}
