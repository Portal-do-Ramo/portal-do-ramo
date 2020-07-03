<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStrikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('strikes', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->char('membro_aplicou', 12);
            $table->char('membro_recebeu', 12);
            $table->enum('situacao', ['Solicitado', 'Recusado', 'Aprovado', 'Em Processamento', 'Mantido', 'Retirado'])->default('Solicitado');
            $table->tinyInteger('aprovado')->virtualAs("situacao IN ('Aprovado', 'Mantido', 'Em Processamento')");
            $table->date('data_aprovado')->nullable();
            $table->text('motivo');
            $table->tinyInteger('audiencia_solicitada')->default(0);
            $table->date('data_audiencia_solicitada')->nullable();
            $table->date('data_audiencia')->nullable();
            $table->time('hora_audiencia')->nullable();
            
            $table->foreign('membro_aplicou')->references('matricula')->on('usuarios')->onUpdate('cascade');
            $table->foreign('membro_recebeu')->references('matricula')->on('usuarios')->onUpdate('cascade');

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
        Schema::dropIfExists('strikes');
    }
}
