<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPointsFrequencyValues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chain_frequency', function (Blueprint $table) {
            $table->smallInteger('points_for_completion')->default(1);
        });

        \DB::table('chain_frequency')->
            where('frequency', 'weekly')->
            update(['points_for_completion' => 7]);

        \DB::table('chain_frequency')->
            where('frequency', 'monthly')->
            update(['points_for_completion' => 30]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('chain_frequency', function (Blueprint $table) {
            $table->dropColumn(['points_for_completion']);
        });
    }
}
