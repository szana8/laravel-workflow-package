<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use szana8\Laraflow\Traits\Flowable;
use szana8\LaraflowGo\Traits\GoJsAble;

class Orders extends Model
{
    use Flowable, GoJsAble;

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['possibleTransactions', 'actualStepName', 'flowHistory', 'goJsObject', 'nodeDataArray', 'validators', 'callbacks'];

    /**
     * Return the possible transitions list.
     *
     * @return array
     */
    public function getPossibleTransactionsAttribute()
    {
        return $this->laraflowInstance()->getPossibleTransitions();
    }

    /**
     * Return the actual step name of the issue.
     *
     * @return string
     */
    public function getFlowHistoryAttribute()
    {
        return $this->history();
    }

    /**
     * Return the actual step name of the issue.
     *
     * @return string
     */
    public function getActualStepNameAttribute()
    {
        return $this->getActualStepName();
    }

    public function getLaraflowStates()
    {
        return config('laraflow.default');
    }
}
