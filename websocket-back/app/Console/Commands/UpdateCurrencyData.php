<?php

namespace App\Console\Commands;

use App\Events\CurrencyEvent;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class UpdateCurrencyData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update-currency-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $previousCurrencyData = Cache::get('currencies');

        try {
            // Check if currency data is cached
            $response = Http::get('https://api.monobank.ua/bank/currency');
            $newCurrencyData = $response->json();

            // Dispatch CurrencyEvent with new currencies
//            if (empty($newCurrencyData) || $newCurrencyData !== $previousCurrencyData) {
                Cache::put('currencies', $newCurrencyData, 300);

                event(new CurrencyEvent($newCurrencyData));

                $this->info('Currency data updated');
//            }
        } catch (RequestException $e) {
            // Log error or perform error handling
            logger()->error('Error fetching currency data from Monobank API: '.$e->getMessage());
        } catch (Exception $e) {
            // Handle other exceptions
            logger()->error('An error occurred: '.$e->getMessage());
        }
    }
}
