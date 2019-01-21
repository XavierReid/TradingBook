// TradeBook and Order classes
const { TradeBook, Order, seed } = require('./utils'),
    GOOGLE = new TradeBook('GOOG'),
    FACEBOOK = new TradeBook('FB'),
    ORACLE = new TradeBook('ORCL');
    
const Books = [GOOGLE, FACEBOOK, ORACLE];

// Server Setup
const express = require('express'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    app = express();
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
// Sends the correct TradeBook to the React client corresponding to its ticker
app.get('/tradeBook/:ticker', (req, res) => {
    const ticker = req.params.ticker;
    const book = Books.find(b => b.ticker === ticker);
    res.json({ book: book, transaction: null });
});

// Submits a stock order to the corresponding TradeBook
// If a trade transanction is executed, send the transaction to the React client as well
app.post('/addNewOrder/:ticker', (req, res) => {
    console.log('received new order');
    const ticker = req.params.ticker;
    const { side, price, shareAmount } = req.body;
    const order = new Order(ticker, side, Number(price), Number(shareAmount));
    const book = Books.find(b => b.ticker === ticker);
    const transaction = book.addOrder(order);
    res.json({ book: book, transaction: transaction });
});

// Running the server
app.listen(port, () => console.log(`Listening on port ${port}`));
