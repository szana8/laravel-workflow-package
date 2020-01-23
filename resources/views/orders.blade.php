@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <laraflow-designer :configuration="{{ json_encode($laraflow) }}">
            </laraflow-designer>

            {{-- @foreach($orders as $order)
            <div class="card mt-2">
                <div class="card-header">{{ $order->order_number}}
        </div>
        <div class="card-body">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ $order->actualStepName }}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    @foreach($order->possibleTransactions as $possibleTransaction)
                    <a class="dropdown-item"
                        href="/orders/updateStep/{{$order->id}}/{{$possibleTransaction['key']}}">{{ $possibleTransaction['text']}}</a>
                    @endforeach

                </div>

                @foreach($order->flowHistory as $history)
                <p>History: {{ $history->fromStepName }} -> {{ $history->toStepName }}</p>
                @endforeach

            </div>
        </div>
    </div>
    @endforeach --}}
</div>
</div>
</div>
@endsection
