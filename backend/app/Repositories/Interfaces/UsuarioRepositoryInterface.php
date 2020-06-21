<?php

namespace App\Repositories\Interfaces;

use App\Models\Usuario;

interface UsuarioRepositoryInterface
{ 
    public function index();

    public function indexMensagens();

    public function searchUsuario();

    public function getCursos();

    public function getHierarquias();
    
    public function getListaPresenca();
    
    public function getInativos();

    public function getDesligados();

    public function getPagantes();
    
    public function minhasNotificacoes();

    public function create(array $dadosValidos);

    public function simpleUpdate(Usuario $usuario , array $dadosValidos);

    public function updateFully(Usuario $usuario, array $dadosValidos);

    public function primeiroLogin(Usuario $usuario, array $dadosValidos);

    public function setInativo(Usuario $usuario);

    public function setDesligado(Usuario $usuario);

    public function setFotoPerfil(Usuario $usuario, $url);

    public function setHierarquia(string $matricula, int $hierarquia = 1);
}