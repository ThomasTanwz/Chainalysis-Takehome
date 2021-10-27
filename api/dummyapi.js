const fetch = require("cross-fetch");

module.exports = async (req, res) => {
    const api_url = 'http://api.coinlayer.com/live?access_key=9b975cd03936f05fa1627e1a2e22aa79';
    const fetch_response = await fetch(api_url);
    res.statusCode = 201;
    const json = await fetch_response.json();
    console.log(json);
    res.json(json);
}