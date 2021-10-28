import React from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [btc, setBTC] = useState({name: "BTC", price: 0});
  const [eth, setETH] = useState({name: "ETH", price: 0});

  useEffect(() => {
    //makes an async fetch call to our serverless function and fetches data from source
    async function getData() {
      const res = await fetch('/api/exchanges', {method: "GET"});
      let json = await res.json();
      json = json.filter(obj => {
        return obj.name === 'Ethereum' || obj.name === 'Bitcoin'
      });

      setBTC({
        name: json[0].name,
        price: json[0].priceUsd
      });
      setETH({
        name: json[1].name,
        price: json[1].priceUsd
      });
      console.log(data);
    }
    getData();
  }, []);

  const data = [btc, eth];

  const renderLineChart = (
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='price' fill="#8884d8" />
      </BarChart>
  );

  return (
    <main>
      <h1>BitCoin + Ethereum Exchange Reference</h1>
      {renderLineChart}
    </main>
  );
}

export default App;
