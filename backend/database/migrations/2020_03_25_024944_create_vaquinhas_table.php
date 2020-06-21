<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVaquinhasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vaquinhas', function (Blueprint $table) {
            $table->string('nome_vaquinha_slug')->primary();
            $table->string('nome_vaquinha')->unique();
            $table->date('data_inicio');
            $table->date('data_fim');
            $table->tinyInteger('aberto')->virtualAs('CURRENT_DATE() BETWEEN data_inicio AND data_fim');

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
        Schema::dropIfExists('vaquinhas');
    }
}
