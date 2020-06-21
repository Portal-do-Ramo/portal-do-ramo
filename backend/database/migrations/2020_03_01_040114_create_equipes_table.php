<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipes', function (Blueprint $table) {
            $table->string('nome_equipe_slug', 30)->primary();
            $table->string('nome_equipe', 30)->unique();
            $table->char('matricula_coordenador', 12);
            $table->char('matricula_assessor', 12)->nullable();
            $table->string('foto_url')->nullable();
            $table->string('capitulo')->nullable();
            $table->json('matriz_habilidades')->default(json_encode(new stdClass));
            
            $table->foreign('matricula_coordenador')->references('matricula')->on('usuarios')->onUpdate('cascade');
            $table->foreign('matricula_assessor')->references('matricula')->on('usuarios')->onUpdate('cascade');
            
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
        Schema::dropIfExists('equipes');
    }
}
