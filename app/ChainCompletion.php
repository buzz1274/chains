<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChainCompletion extends Model
{
    protected $table = 'chain_completion';

    public static function chainBelongsToUserAndIsOutstanding(
        $userID,
        $completionID
    ) {
        return (bool)self::select(array('chain_completion.id'))->
            where('chain_completion.id', '=', $completionID)->
            where('user_id', '=', $userID)->
            join(
                'chain',
                'chain.id',
                '=',
                'chain_completion.chain_id'
            )->count();
    }

    public static function doOlderOutstandingChainsExist($completionID)
    {
        return (bool)self::select(array('chain_completion.id'))->
            where('chain_completion.id', '=', $completionID)->
            whereNull('chain_completion.completed')->
            join(
                'chain_completion as cc_outstanding_older',
                ''

        )->count();
    }

}

