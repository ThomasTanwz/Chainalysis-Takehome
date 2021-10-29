import React from 'react';
import {DropdownButton, Dropdown }from 'react-bootstrap';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
import { useEffect, useState } from 'react';
import './App.css';
import './App_Background.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    //first, we declare state hooks to be used later
  const [btc, setBTC] = useState({name: "BTC", price: 0});
  const [eth, setETH] = useState({name: "ETH", price: 0});
  const [options, setOPT] = useState([{exchange: 'ex1'}, {exchange: 'ex2'}]);

  //hard coded data for testing
    //TODO: Get from options
  const exchange = "kraken";

  useEffect(() => {
    //makes an async fetch call to our serverless function and fetches data from source
    async function getData() {
      const res = await fetch(`/api/exchanges/?exchange=${exchange}`, {method: "GET"});
      let json = await res.json();
      //We only want Ethereum and Bitcoin in our application
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

    }
    getData();
  }, []);

  const data = [btc, eth];

  //bar chart we use to visualize the data
  const barChart = (
      <BarChart width={850} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" fill="#ffffff"/>
        <XAxis dataKey="name" stroke="#000000"/>
        <YAxis stroke="#000000"/>
        <Tooltip />
        <Legend />
        <Bar dataKey='price' fill="#f78502" />
      </BarChart>
  );


  //reusable dropdown
  function DropDown(props){
      return (
        <DropdownButton id="dropdown-basic-button" title={props.name} onSelect=
            {props.id === '1'? dropDownHandler1: dropDownHandler2}>
            <Dropdown.Item eventKey="binance">Binance</Dropdown.Item>
            <Dropdown.Item eventKey="bittrex">Bittrex</Dropdown.Item>
            <Dropdown.Item eventKey="coinbasepro">CoinbasePro</Dropdown.Item>
            <Dropdown.Item eventKey="kraken">Kraken</Dropdown.Item>
            <Dropdown.Item eventKey="kucoin">Kucoin</Dropdown.Item>
            <Dropdown.Item eventKey="poloneix">Poloneix</Dropdown.Item>
        </DropdownButton>
    );
  }

  //dropdown button handler
  const dropDownHandler1 = event => {
      let copy = [...options];
      copy[0].exchange = event;
      setOPT(copy);
      console.log(event);
  }

  const dropDownHandler2 = event => {
      let copy = [...options];
      copy[1].exchange = event;
      setOPT(copy);
      console.log(event);
  }

  return (
    <main>
      <h1>BitCoin + Ethereum Exchange Reference</h1>
        <div>{barChart}</div>
        <div className="flexbox-container">
            <div className="space"><DropDown name="exchange1" id='1'/></div>
            <div><DropDown name="exchange2" id='2'/></div>
            <div><h4>{options.map(home => <div>{home.exchange}</div>)}</h4></div>
        </div>
    </main>
  );
}

export default App;
