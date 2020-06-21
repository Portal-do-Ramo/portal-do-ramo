<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTipoPedidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_pedidos', function (Blueprint $table) {
            $table->string('nome_tipo_pedido_slug', 30)->primary();
            $table->string('nome_tipo_pedido', 30)->unique();
            $table->enum('area', ['Pessoas', 'Financeiro']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipo_pedidos');
    }
}
