<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParceriasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parcerias', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->string('nome_empresa');
            $table->string('link_site_empresa');
            $table->string('beneficios');
            $table->json('equipes_beneficiadas');
            $table->text('como_encaixamos');
            $table->string('email_empresa')->nullable();
            $table->string('telefone_empresa')->nullable();
            $table->tinyInteger('consolidada')->default(0);
            $table->char('membro_solicitou', 12)->nullable();

            $table->foreign('membro_solicitou')->references('matricula')->on('usuarios');

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
        Schema::dropIfExists('parcerias');
    }
}
