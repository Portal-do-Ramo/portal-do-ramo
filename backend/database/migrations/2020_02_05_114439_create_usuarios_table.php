<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->char('matricula', 12)->primary();
            $table->string('senha');
            $table->string('nome_completo', 90);
            $table->string('email', 40)->unique();
            $table->tinyInteger('ativo')->default(0);
            $table->unsignedInteger('hierarquia_id');
            $table->string('foto_url');
            $table->unsignedInteger('situacao_id')->default(1);
            $table->date('data_fim_inatividade')->nullable();
            $table->date('data_desligado')->nullable();
            $table->tinyInteger('assessor');
            $table->tinyInteger('marketing');
            
            $table->foreign('hierarquia_id')->references('id')->on('hierarquias');
            $table->foreign('situacao_id')->references('id')->on('situacoes');

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
        Schema::dropIfExists('usuarios');
    }
}
