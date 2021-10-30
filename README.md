
# Project Overview

This project is my take-home assignment for University Grad SWE position at Chainalysis, Inc. It is bootstrapped with
[Create React App](https://create-react-app.dev/) and deployed with [Vercel](https://vercel.com/). 

The front-end of my webpage was created with **React** and the backend was created with **Node.js**.
The backend API was implemented and deployed as a serverless function.

I used [Recharts](https://recharts.org/en-US/) and [React-Bootstrap](https://react-bootstrap.github.io/)
libraries for visualization and styling purposes. 

## Live Webpage

http://chainalysis-takehome.vercel.app/

Choose any two different exchange sources
from the drop-down menus. An analysis and visualization will then be generated. 
You can then hover over the chart to see more details.

## Directory Navigation

**/api/exchanges.js**: Backend API(s) used for this project

**/src/App.js**: Source code for front-end, written with React.

**/src/App.css**: Stylesheet for webpage's styling purposes.

**package.json**: Scripts and dependencies used for this webapp.
## Build & Run Locally
1. Make sure that you have the latest [Node.js](https://nodejs.org/en/download/) and
[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.


2. Install all the dependencies and proceed to either **step 3** or **step 4**
```shell
$ npm install
```
3. **Option 1**: Install Vercel CLI and run directly
      1. Install Vercel(You may need a vercel account)
    ```shell
    $ npm i -g vercel
    ```
    2. run vercel-dev via CLI
   ```shell
    $ vercel dev
    ```
4. **Option 2**: run npm dev (For some reason, this method does not enable the API usage.):
```shell
    $ npm run dev
```
5. Go to localhost:3000 in browser to see the webpage in dev mode. 

## Answers To The Questionnaire
Please see [here](./Questionnaire.md) for my answers to the questionnaire.

## Author Information
**Name**: Wenze Tan

**Email**: thomastanwz@gmail.com

**Github**: https://github.com/ThomasTanwz/

**LinkedIn**: https://www.linkedin.com/in/wenze-tan-45504b193/
