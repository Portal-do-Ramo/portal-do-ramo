<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMembrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('membros', function (Blueprint $table) {
            $table->char('matricula_usuario', 12)->primary();
            $table->char('cpf', 14)->unique()->nullable();
            $table->string('rg', 20)->nullable();
            $table->string('orgao_emissor', 15)->nullable();
            $table->date('data_nascimento');
            $table->unsignedInteger('curso_id');
            $table->json('telefones')->default(json_encode(new stdClass));
            $table->tinyInteger('pagante')->default(0);
            $table->integer('numero_ieee')->nullable();
            $table->date('data_fim_membresia')->nullable();
            $table->json('matriz_habilidade')->default(json_encode(new stdClass));
            $table->string('cadastro_robocore', 30)->nullable();
            $table->enum('tipo_sanguineo', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])->nullable();
            $table->string('medicamentos_utiliza')->nullable();
            $table->string('medicamentos_alergico')->nullable();
            $table->string('alimentos_alergico')->nullable();
            $table->string('condicoes_especiais')->nullable();
            $table->json('info_contato')->default(json_encode(new stdClass));
            
            $table->foreign('matricula_usuario')->references('matricula')->on('usuarios')->onUpdate('cascade');
            $table->foreign('curso_id')->references('id')->on('cursos');

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
        Schema::dropIfExists('membros');
    }
}
