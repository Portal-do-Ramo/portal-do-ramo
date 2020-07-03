<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArquivosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('arquivos', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->string('nome', 60);
            $table->string('path');
            $table->string('extensao_arquivo');

            $table->string('id_relacionado', 35);
            $table->string('tipo_relacionado');

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
        Schema::dropIfExists('arquivos');
    }
}
