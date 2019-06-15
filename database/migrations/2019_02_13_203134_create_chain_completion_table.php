<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChainCompletionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chain_completion', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('chain_id')->unsigned();
            $table->foreign('chain_id')->references('id')->on('chain');
            $table->date('chain_completion_date');
            $table->boolean('completed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chain_completion');
    }
}
