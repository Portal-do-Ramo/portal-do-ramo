<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projetos', function (Blueprint $table) {
            $table->string('nome_projeto_slug', 35)->primary();
            $table->string('nome_projeto', 35)->unique();
            $table->date('data_inicio');
            $table->date('data_fim')->nullable();
            $table->string('nome_equipe', 30);
            $table->string('link_trello')->nullable();
            $table->enum('estagio', ['Fase de pesquisa', 'Apresentação', 'Fase de execução', 'Fase de conclusão', 'Fase de checagem', 'Concluído'])->default('Fase de Pesquisa');
            $table->tinyInteger('ativo')->default(1);
            $table->json('areas');

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
        Schema::dropIfExists('projetos');
    }
}
