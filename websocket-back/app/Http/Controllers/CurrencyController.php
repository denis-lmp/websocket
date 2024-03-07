<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;

class CurrencyController extends Controller
{
    /**
     * @return mixed|string[]
     */
    public function getCurrencies(): mixed
    {
        return Cache::get('currencies') ?
            Cache::get('currencies') :
            ['Currency data not available. Please try again later.'];
    }
}
