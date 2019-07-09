<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chain extends Model
{

    protected $table = 'chain';

    public static function chains($userID)
    {
        $query =
            self::select(array('chain.id', 'parent_id', 'chain',
                               'start_date', 'frequency'))->
                    where('user_id', $userID)->
                    where('active', true)->
                    join(
                        'chain_frequency',
                        'chain_frequency.id',
                        '=',
                        'chain.frequency_id'
                    );

        return $query->get();
    }
}
