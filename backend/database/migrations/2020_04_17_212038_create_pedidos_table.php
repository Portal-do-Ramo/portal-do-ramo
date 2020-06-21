<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePedidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->string('tipo_pedido', 30);
            $table->char('matricula_membro_solicitou', 12);
            $table->string('nome_projeto_solicitado', 35)->nullable();
            $table->json('dados_pedido');
            $table->date('data_aprovado')->nullable();
            $table->enum('situacao', ['Pendente', 'Aprovado', 'Recusado'])->default('Pendente');

            $table->foreign('matricula_membro_solicitou')->references('matricula')->on('usuarios')->onUpdate('cascade');
            $table->foreign('nome_projeto_solicitado')->references('nome_projeto_slug')->on('projetos')->onUpdate('cascade');
            $table->foreign('tipo_pedido')->references('nome_tipo_pedido_slug')->on('tipo_pedidos');

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
        Schema::dropIfExists('pedidos');
    }
}
