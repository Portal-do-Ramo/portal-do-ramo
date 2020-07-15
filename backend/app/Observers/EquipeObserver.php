<?php

namespace App\Observers;

use App\Models\Equipe;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;

class EquipeObserver
{
    protected $usuarioRepository;

    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

    public function created(Equipe $equipe)
    {
        $this->usuarioRepository->setHierarquia($equipe->matricula_coordenador, 7);
        if($equipe->matricula_assessor) $this->usuarioRepository->setHierarquia($equipe->matricula_assessor, 5);
    }

    public function changedCoordinator(Equipe $equipe)
    {
        $this->usuarioRepository->setHierarquia($equipe->getOriginal('matricula_coordenador'));
        $this->usuarioRepository->setHierarquia($equipe->matricula_coordenador, 7);
    }

    public function changedAdvisor(Equipe $equipe)
    {
        if($matriculaAssessorOriginal = $equipe->getOriginal('matricula_assessor'))
            $this->usuarioRepository->setHierarquia($matriculaAssessorOriginal);
        if($equipe->matricula_assessor)
            $this->usuarioRepository->setHierarquia($equipe->matricula_assessor, 5);
    }
}
