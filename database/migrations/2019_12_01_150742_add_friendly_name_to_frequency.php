<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFriendlyNameToFrequency extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chain_frequency', function (Blueprint $table) {
            $table->string('frequency', 9)->change();
            $table->string('display_name')->nullable();
        });

        \DB::table('chain_frequency')->insert([
            'frequency' => 'mon_thurs',
            'display_name' => 'Mon to Thurs'
        ]);

        \DB::table('chain_frequency')->
            where('frequency', 'daily')->
            update(['display_name' => 'Daily']);

        \DB::table('chain_frequency')->
            where('frequency', 'weekly')->
            update(['display_name' => 'Weekly']);

        \DB::table('chain_frequency')->
            where('frequency', 'weekday')->
            update(['display_name' => 'Weekday']);

        \DB::table('chain_frequency')->
            where('frequency', 'monthly')->
            update(['display_name' => 'Monthly']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('chain_frequency', function (Blueprint $table) {
            $table->dropColumn(['display_name']);
        });
    }
}
