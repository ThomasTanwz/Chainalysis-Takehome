import React from 'react';
import {DropdownButton, Dropdown }from 'react-bootstrap';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import { useEffect, useState } from 'react';
import './App.css';
import './App_Background.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    /* First, we declare state hooks to be used later
    * ex1: Exchange 1 we are going to pull data from, activated upon user's selection from the dropdown menu.
    * ex2: Exchange 1 we are going to pull data from, activated upon user's selection from the dropdown menu.
    * options: User's selections from the dropdown menu.
    * chartData: Data we use to fill the chart, which is changed every time user make a selection.
    * */
  const [ex1, setEX1] = useState([{name: "BTC", price: 0}, {name: "ETH", price: 0}]);
  const [ex2, setEX2] = useState([{name: "BTC", price: 0}, {name: "ETH", price: 0}]);
  const [options, setOPT] = useState([{exchange: 'Exchange 1'}, {exchange: 'Exchange 2'}]);
  const [chartData, setChartData] = useState([{}]);


    //Make an async fetch call to our serverless function and fetches data from source if needed
    async function getData(index) {
        //Send an Ajax GET to our backend API
        const res = await fetch(`/api/exchanges/?exchange=${options[index].exchange}`, {method: "GET"});
        let json = await res.json();
        //We only want Ethereum and Bitcoin in our application.
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
          },
          {
              "name": "Ethereum",
          }
      ];
      data[0][options[0].exchange] = ex1[0].name === 'Bitcoin'?ex1[0].price:ex1[1].price;
      data[0][options[1].exchange] = ex2[0].name === 'Bitcoin'?ex2[0].price:ex2[1].price;
      data[1][options[0].exchange] = ex1[0].name === 'Ethereum'?ex1[0].price:ex1[1].price;
      data[1][options[1].exchange] = ex2[0].name === 'Ethereum'?ex2[0].price:ex2[1].price;
      console.log(data);
      setChartData(data);
  }, [ex1, ex2]);

  const analysis = () => {
      let exchange1 = options[0].exchange;
      let exchange2 = options[1].exchange;
      if(exchange1=== 'Exchange 1' && exchange2 === 'Exchange 2') {
          return `Please select two sources for an analysis.`;
      }
      if(exchange1!== 'Exchange 1' && exchange2 === 'Exchange 2'){
          return `Exchange 1 selected: ${exchange1}, select Exchange 2 for an analysis.`;
      }
      if(exchange1=== 'Exchange 1' && exchange2 !== 'Exchange 2'){
          return `Exchange 2 selected: ${exchange2}, select Exchange 1 for an analysis.`;
      }
      if(exchange1 === exchange2){
          return `Please select two different sources. You have only selected: ${exchange1}.`
      }
      let btce1 = ex1[0].price, btce2 = ex2[0].price;
      let ethe1 = ex1[1].price, ethe2 = ex2[1].price;
      //a little hack to get the values in order
      if(btce1 < ethe1) [btce1, ethe1] = [ethe1, btce1];
      if(btce2 < ethe2) [btce2, ethe2] = [ethe2, btce2];
      return `Exchange 1: ${exchange1}, Exchange 2: ${exchange2}.
      ${exchange1} is selling Bitcoin at ${btce1} USD and Ethereum at ${ethe1} USD.
      ${exchange2} is selling Bitcoin at ${btce2} USD and Ethereum at ${ethe2} USD.
      Buy Bitcoin at ${btce1<btce2?(exchange1):(exchange2)} and sell at ${btce1>btce2?(exchange1):(exchange2)}.
      Buy Ethereum at ${ethe1<ethe2?(exchange1):(exchange2)} and sell at ${ethe1>ethe2?(exchange1):(exchange2)}.
      Potential Bitcoin profit: ${Math.abs(btce1-btce2).toFixed(2)} USD per unit.
      Potential Ethereum profit: ${Math.abs(ethe1-ethe2).toFixed(2)} USD per unit.`;
  }
  return (
    <main>
      <h1>BitCoin + Ethereum Exchange Analyzer</h1>
        <div>{barChart}</div>
        <div className="flexbox-container">
            <div className="space"><DropDown name="Exchange 1" id='1'/></div>
            <div className="space"><DropDown name="Exchange 2" id='2'/></div>
            <div className="textbox">
                {analysis()}
            </div>
        </div>
    </main>
  );
}

export default App;
