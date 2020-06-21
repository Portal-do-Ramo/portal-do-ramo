<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCaixasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('caixas', function (Blueprint $table) {
            $table->string('nome_caixa_slug')->primary();
            $table->string('nome_caixa')->unique();
            $table->float('porcentagem_orcamento');
            $table->float('orcamento_atual')->default(0);
            $table->tinyInteger('ativo')->default(1);
            $table->tinyInteger('emergencial_equipe')->default(0);

            $table->string('id_relacionado')->nullable();
            $table->string('tipo_relacionado')->nullable();

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
        Schema::dropIfExists('caixas');
    }
}
