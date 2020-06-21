<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePsisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('psis', function (Blueprint $table) {
            $table->string('nome_psi_slug', 32)->primary();
            $table->string('nome_psi', 32)->unique();
            $table->char('membro_criou', 12);
            $table->date('data_inicio');
            $table->date('data_fim');
            $table->json('gestao_areas_vagas')->nullable();

            $table->foreign('membro_criou')->references('matricula')->on('usuarios')->onUpdate('cascade');;

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
        Schema::dropIfExists('psis');
    }
}
