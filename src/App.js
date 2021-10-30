import React from 'react';
import {DropdownButton, Dropdown }from 'react-bootstrap';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
import { useEffect, useState } from 'react';
import './App.css';
import './App_Background.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    //first, we declare state hooks to be used later
  const [ex1, setEX1] = useState([{name: "BTC", price: 0}, {name: "ETH", price: 0}]);
  const [ex2, setEX2] = useState([{name: "BTC", price: 0}, {name: "ETH", price: 0}]);
  const [options, setOPT] = useState([{exchange: 'Exchange 1'}, {exchange: 'Exchange 2'}]);
  const [chartData, setChartData] = useState([{}]);


    //makes an async fetch call to our serverless function and fetches data from source
    async function getData(index) {
        const res = await fetch(`/api/exchanges/?exchange=${options[index].exchange}`, {method: "GET"});
        let json = await res.json();
        //We only want Ethereum and Bitcoin in our application
        json = json.filter(obj => {
            return obj.name === 'Ethereum' || obj.name === 'Bitcoin'
        });

        let newEx = (index === 0)?([...ex1]):([...ex2]);
        newEx[0].name = json[0].name;
        newEx[0].price = json[0].priceUsd;
        newEx[1].name = json[1].name;
        newEx[1].price = json[1].priceUsd;
        if(index === 0){
            setEX1(newEx);
        }else{
            setEX2(newEx);
        }
    }


  //bar chart we use to visualize the data
  const barChart = (
      <BarChart width={850} height={500} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" fill="#ffffff"/>
        <XAxis dataKey="name" type="category" stroke="#000000"/>
        <YAxis stroke="#000000"/>
        <Tooltip />
        <Legend />
        <Bar dataKey={options[0].exchange} fill="#f78502" />
          <Bar dataKey={options[1].exchange} fill="#036bfc" />
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
            <Dropdown.Item eventKey="poloniex">Poloniex</Dropdown.Item>
        </DropdownButton>
    );
  }

  //dropdown button handlers
  const dropDownHandler1 = event => {
      let copy = [...options];
      copy[0].exchange = event;
      setOPT(copy);
      getData(0);
  }
  const dropDownHandler2 = event => {
      let copy = [...options];
      copy[1].exchange = event;
      setOPT(copy);
      getData(1);
  }

  useEffect(()=>{
      //data we use to make the barchart
      let data = [
          {
              "name": "Bitcoin",
              // "exchange 1": ex1[0].name === 'Bitcoin'?ex1[0].price:ex1[1].price,
              // "exchange 2": ex2[0].name === 'Bitcoin'?ex2[0].price:ex2[1].price
          },
          {
              "name": "Ethereum",
              // "exchange 1": ex1[0].name === 'Ethereum'?ex1[0].price:ex1[1].price,
              // "exchange 2": ex2[0].name === 'Ethereum'?ex2[0].price:ex2[1].price
          }
      ];
      data[0][options[0].exchange] = ex1[0].name === 'Bitcoin'?ex1[0].price:ex1[1].price;
      data[0][options[1].exchange] = ex2[0].name === 'Bitcoin'?ex2[0].price:ex2[1].price;
      data[1][options[0].exchange] = ex1[0].name === 'Ethereum'?ex1[0].price:ex1[1].price;
      data[1][options[1].exchange] = ex2[0].name === 'Ethereum'?ex2[0].price:ex2[1].price;
      console.log(data);
      setChartData(data);
  }, [ex1, ex2]);

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
