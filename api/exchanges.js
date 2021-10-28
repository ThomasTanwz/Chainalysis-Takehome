//Node.JS serverless function as backend service

const fetch = require("cross-fetch");

module.exports = async (req, res) => {
    const api_url = 'https://api.shrimpy.io/v1/binance/ticker'
    const fetch_response = await fetch(api_url);
    res.statusCode = 201;
    const json = await fetch_response.json();
    res.json(json);
}