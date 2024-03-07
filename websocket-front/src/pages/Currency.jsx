import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from '../axios';

function PusherFunction() {

    const [currencyData, setCurrencyData] = useState([]);
    const [lastUpdateTime, setLastUpdateTime] = useState(null);

    useEffect(() => {
        // Function to fetch initial currency data from the API
        const fetchCurrencyData = async () => {
            try {
                const response = await axios.get('currency');
                setCurrencyData(response.data);
                setLastUpdateTime(new Date().toLocaleTimeString());
            } catch (error) {
                console.error('Error fetching currency data:', error);
            }
        };

        fetchCurrencyData();
    }, []);

    useEffect(() => {
        // Subscribe to Pusher events after fetching initial data
        const pusher = new Pusher(import.meta.env.VITE_REACT_APP_PUSHER_APP_KEY, {
            cluster: 'eu',
        });
        const channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function (data) {
            console.log('New websocket currencies:', data.message);
            setCurrencyData((prevData) => [...prevData, data.message]);
            setLastUpdateTime(new Date().toLocaleTimeString());
        });

        return () => {
            pusher.unsubscribe('my-channel');
        };
    }, []);

    return (
        <div>
            <div>
                <h2>Currency Data</h2>
                <h2 className="my-10">Updated at: {lastUpdateTime}</h2>

                <ul>
                    {currencyData.map((currency, index) => (
                        <li key={index}>{currency.currencyCodeA} {currency.currencyCodeB} {currency.date} {currency.rateBuy} {currency.rateSell || currency.rateCross}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PusherFunction;
