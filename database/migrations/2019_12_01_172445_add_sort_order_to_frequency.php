<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSortOrderToFrequency extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chain_frequency', function (Blueprint $table) {
            $table->smallInteger('ordering')->default(0);
        });

        \DB::table('chain_frequency')->
            where('frequency', 'daily')->
            update(['ordering' => 1]);

        \DB::table('chain_frequency')->
            where('frequency', 'weekly')->
            update(['ordering' => 2]);

        \DB::table('chain_frequency')->
            where('frequency', 'mon_thurs')->
            update(['ordering' => 3]);

        \DB::table('chain_frequency')->
            where('frequency', 'weekday')->
            update(['ordering' => 4]);

        \DB::table('chain_frequency')->
            where('frequency', 'monthly')->
            update(['ordering' => 5]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
