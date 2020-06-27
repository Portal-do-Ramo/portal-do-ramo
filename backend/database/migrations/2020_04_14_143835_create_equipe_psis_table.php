<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipePsisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipe_psis', function (Blueprint $table) {
            $table->string('nome_equipe', 35);
            $table->string('nome_psi', 32);
            $table->json('areas_vagas');

            $table->foreign('nome_equipe')->references('nome_equipe_slug')->on('equipes')->onUpdate('cascade');
            $table->foreign('nome_psi')->references('nome_psi_slug')->on('psis')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('equipe_psis');
    }
}
