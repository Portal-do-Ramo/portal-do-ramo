<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoacoesVaquinhasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doacoes_vaquinhas', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->char('matricula_membro_doador', 12);
            $table->string('nome_vaquinha');
            $table->float('valor');
            $table->date('data');

            $table->foreign('matricula_membro_doador')->references('matricula')->on('usuarios')->onUpdate('cascade');
            $table->foreign('nome_vaquinha')->references('nome_vaquinha_slug')->on('vaquinhas')->onUpdate('cascade');

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
        Schema::dropIfExists('doacoes_vaquinhas');
    }
}
