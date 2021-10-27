import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [stuff, setStuff] = useState(null);
  useEffect(() => {
    async function getData() {
      const res = await fetch('/api/dummyapi', {method: "GET"});
      let json = await res.json();
      //finally got the fucking data
      console.log(json.rates.BTC);
    }
    getData();
  }, []);
  return (
    <main>
      <h1>Create React App + Node JS API</h1>
      <h2>
        Deployed with{' '}
        <a
          href="https://vercel.com/docs"
          target="_blank"
          rel="noreferrer noopener"
        >
          Vercel
        </a>
        !
      </h2>
      <p>
        <a
          href="https://github.com/vercel/vercel/tree/main/examples/create-react-app"
          target="_blank"
          rel="noreferrer noopener"
        >
          This project
        </a>{' '}
        was bootstrapped with{' '}
        <a href="https://facebook.github.io/create-react-app/">
          Create React App
        </a>{' '}
        and contains three directories, <code>/public</code> for static assets,{' '}
        <code>/src</code> for components and content, and <code>/api</code>{' '}
        which contains a serverless <a href="https://golang.org/">Go</a>{' '}
        function. See{' '}
        .
      </p>
      <br />
    </main>
  );
}

export default App;
