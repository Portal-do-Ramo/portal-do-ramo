<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFaltasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faltas', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->char('matricula_membro', 12);
            $table->date('data');
            $table->unsignedInteger('tipo_id');
            $table->string('descricao')->nullable();
            $table->string('nome_projeto', 35)->nullable();

            $table->foreign('matricula_membro')->references('matricula')->on('usuarios')->onUpdate('cascade');
            $table->foreign('nome_projeto')->references('nome_projeto_slug')->on('projetos')->onUpdate('cascade');
            $table->foreign('tipo_id')->references('id')->on('tipo_faltas');

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
        Schema::dropIfExists('faltas');
    }
}
