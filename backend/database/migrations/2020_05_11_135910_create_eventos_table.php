<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eventos', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->string('nome_evento');
            $table->text('descricao')->nullable();
            $table->date('data_evento');
            $table->time('hora_evento')->nullable();
            $table->tinyInteger('evento_diretoria')->default(0);

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
        Schema::dropIfExists('eventos');
    }
}
