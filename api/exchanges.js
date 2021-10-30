/*
* Author: Wenze Tan
* Email: thomastanwz@gmail.com
* Live Demo: http://chainalysis-takehome.vercel.app/
* Project Repo: https://github.com/ThomasTanwz/Chainalysis-Takehome
* Date: 10/30/2021
* Project Description: This is my take-home assignment for Chainalysis
* */

/*
  Node.JS serverless function as backend service
  Import cross-fetch since nodejs does not have built-in fetch
  */
const fetch = require("cross-fetch");

/*
* Exports a serverless Node JS function that handles requests
* Reference: https://www.shrimpy.io/
* */
module.exports = async (req, res) => {
    //Pass the requested parameter into our api url
    const exchange = req.query.exchange;
    //we use Shrimpy as our exchange reference
    const api_url = `https://api.shrimpy.io/v1/${exchange}/ticker`
    let fetch_response;
    //async fetch to see if our api call succeeded
    await fetch(api_url)
        .then(response => {
            fetch_response = response;
            res.statusCode = 201;
        })
        .catch(err => {
            res.statusCode = 404;
            console.log(err);
        });
    //response parsed as JSON
    const json = await fetch_response.json();
    res.json(json);
}