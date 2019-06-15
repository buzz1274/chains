<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChainFrequencyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chain_frequency', function (Blueprint $table) {
            $table->increments('id');
            $table->string('frequency', 7)->unique();
            $table->timestamps();
        });

        $chains = [
            [
                'frequency' => 'daily',
            ],
            [
                'frequency' => 'weekly',
            ],
            [
                'frequency' => 'weekday',
            ],
            [
                'frequency' => 'monthly',
            ],
        ];

        foreach($chains as $chain) {
            $chain = array_merge($chain, [
                'created_at' => 'NOW()',
                'updated_at' => 'NOW()',
            ]);

            \DB::table('chain_frequency')->insert($chain);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chain_frequency');
    }
}
