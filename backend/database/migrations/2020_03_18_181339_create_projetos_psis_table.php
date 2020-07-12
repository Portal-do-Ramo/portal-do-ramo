<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProjetosPsis extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projetos_psis', function (Blueprint $table) {
            $table->string('nome_projeto', 35);
            $table->string('nome_psi', 32);
            $table->json('areas_vagas');

            $table->foreign('nome_projeto')->references('nome_projeto_slug')->on('projetos')->onUpdate('cascade');
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
        Schema::dropIfExists('projetos_psis');
    }
}
