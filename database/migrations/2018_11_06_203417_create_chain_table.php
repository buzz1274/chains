<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChainTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chain', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedSmallInteger('user_id');
            $table->unsignedSmallInteger('frequency_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedInteger('parent_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('chain');
            $table->string('description')->unique();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->date('date_last_checked')->nullable();
            $table->boolean('active')->default(true);
            $table->foreign('frequency_id')->references('id')->on('chain_frequency');
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
        Schema::dropIfExists('chain');
    }
}
