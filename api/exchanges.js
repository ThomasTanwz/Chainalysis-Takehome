//Node.JS serverless function as backend service
//import cross-fetch since nodejs does not have built-in fetch
const fetch = require("cross-fetch");

module.exports = async (req, res) => {
    //pass the requested parameter into our api url
    const exchange = req.query.exchange;
    const api_url = `https://api.shrimpy.io/v1/${exchange}/ticker`
    // let fetch_response = await fetch(api_url);
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

    const json = await fetch_response.json();
    res.json(json);
}