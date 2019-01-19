// TradeBook and Order classes
const { TradeBook, Order } = require('./utils'),
    GOOGLE = new TradeBook('GOOG'),
    FACEBOOK = new TradeBook('FB'),
    ORACLE = new TradeBook('ORCL');

// Server Setup
const express = require('express'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    app = express();
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes

app.get('/', (req, res) => {
    res.send(GOOGLE);
});

app.post('/addNewOrder', (req, res) => {
    console.log('received new order');
    const { side, price, shareAmount } = req.body;
    const order = new Order('GOOG', side, Number(price), Number(shareAmount)); // hardcode GOOG for now
    GOOGLE.addOrder(order);
    res.send(GOOGLE);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
