<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistrosDeCaixaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('registros_de_caixa', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->date('data');
            $table->float('valor');
            $table->tinyInteger('exclusivo');
            $table->string('caixa_relacionado')->nullable();
            $table->string('descricao');
            $table->enum('tipo', ['Entrada', 'Saída'])->storedAs("IF(valor > 0, 'Entrada', 'Saída')");

            $table->foreign('caixa_relacionado')->references('nome_caixa_slug')->on('caixas')->onUpdate('cascade');

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
        Schema::dropIfExists('registros_de_caixa');
    }
}
