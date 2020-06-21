<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReavaliacoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reavaliacoes', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->string('strike_id');
            $table->date('data');
            $table->text('constatacao');
            
            $table->foreign('strike_id')->references('uuid')->on('strikes');
            
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
        Schema::dropIfExists('reavaliacoes');
    }
}
