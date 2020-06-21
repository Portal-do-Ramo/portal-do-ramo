<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInscricoesPsis extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inscricoes_psis', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('membro_inscrito', 12);
            $table->string('nome_psi', 32);
            $table->string('nome_projeto', 35)->nullable();
            $table->string('nome_equipe', 35)->nullable();
            $table->string('area_solicitada');
            $table->enum('condicao', ['Pendente', 'Aprovado', 'Reprovado']);

            $table->foreign('membro_inscrito')->references('matricula')->on('usuarios')->onUpdate('cascade');
            $table->foreign('nome_psi')->references('nome_psi_slug')->on('psis')->onUpdate('cascade');
            $table->foreign('nome_projeto')->references('nome_projeto_slug')->on('projetos')->onUpdate('cascade');
            $table->foreign('nome_equipe')->references('nome_equipe_slug')->on('equipes')->onUpdate('cascade');

            $table->timestamp('data_criado')->nullable();
            $table->timestamp('data_alterado')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inscricoes_psis');
    }
}
