<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeedbacksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->char('membro_enviou', 12);
            $table->string('assunto');
            $table->text('mensagem');
            $table->tinyInteger('satisfacao');

            $table->foreign('membro_enviou')->references('matricula')->on('usuarios')->onUpdate('cascade');

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
        Schema::dropIfExists('feedbacks');
    }
}
