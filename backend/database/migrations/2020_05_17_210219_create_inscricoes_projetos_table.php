<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInscricoesProjetosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inscricoes_projetos', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->char('matricula_membro', 12);
            $table->string('nome_projeto', 35);
            $table->enum('funcao', ['Membro', 'Assessor', 'Líder'])->default('Membro');
            $table->string('area')->nullable();
            $table->tinyInteger('ativo')->default(1);
            $table->date('data_saida')->nullable();

            $table->foreign('matricula_membro')->references('matricula')->on('usuarios')->onUpdate('cascade');
            $table->foreign('nome_projeto')->references('nome_projeto_slug')->on('projetos')->onUpdate('cascade');

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
        Schema::dropIfExists('inscricoes_projetos');
    }
}
