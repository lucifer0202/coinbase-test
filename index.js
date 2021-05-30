const express = require('express');
const fetch = require('node-fetch');
const Signing = require('./signing_message');
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', { root: __dirname });
});


app.get('/api', (req, res) => {

    let secret = '29+Yh6HmyQWUBeHoDdjK7Lokhs4lMC3aWJL/1hgaR/2r5P8vjc9U/4sM9ONybSWtZLWMJOoVLoWWU7dVX7ay+w==';
    let timestamp = Date.now() / 1000;
    let requestPath = `/${req.query.path}`;
    let method = 'GET';

    let body;
    if (method === 'POST') {
        body = JSON.stringify({
            price: '1.0',
            size: '1.0',
            side: 'buy',
            product_id: 'BTC-USD'
        });
    }

    fetch(`https://api.pro.coinbase.com${requestPath}`, {
        method,
        body,
        headers: {
            'Content-Type': 'application/json',
            'CB-ACCESS-KEY': secret,
            'CB-ACCESS-SIGN': Signing.signingMessage({ secret, timestamp, requestPath, method, body }),
            'CB-ACCESS-TIMESTAMP': timestamp,
            'CB-ACCESS-PASSPHRASE': 'hvowe215y6j'
        }
    })
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            res.json(json)
        })
        .catch(error => {
            console.log('Error: ', error);
        })

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})