<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterParceriasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('parcerias', function (Blueprint $table) {
            $table->string('foto_url')->nullable()->after('nome_empresa');
            $table->enum('nivel', ['Ouro', 'Prata', 'Bronze'])->nullable()->after('membro_solicitou');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('parcerias', function (Blueprint $table) {
            $table->dropColumn(['nivel', 'foto_url']);
        });
    }
}
