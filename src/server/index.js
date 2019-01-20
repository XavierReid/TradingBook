// TradeBook and Order classes
const { TradeBook, Order, seed } = require('./utils'),
    GOOGLE = new TradeBook('GOOG'),
    FACEBOOK = new TradeBook('FB'),
    ORACLE = new TradeBook('ORCL');

// Seed
const Books = [GOOGLE, FACEBOOK, ORACLE];
// seed(GOOGLE);
// seed(FACEBOOK);
// seed(ORACLE);

// Server Setup
const express = require('express'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    app = express();
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/tradeBook/:ticker', (req, res) => {
    const ticker = req.params.ticker;
    const book = Books.find(b => b.ticker === ticker);
    res.send(book);
});

app.post('/addNewOrder/:ticker', (req, res) => {
    console.log('received new order');
    const ticker = req.params.ticker;
    const { side, price, shareAmount } = req.body;
    const order = new Order(ticker, side, Number(price), Number(shareAmount)); // hardcode GOOG for now
    const book = Books.find(b => b.ticker === ticker);
    book.addOrder(order);
    res.send(book);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
