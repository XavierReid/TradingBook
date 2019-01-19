// TradeBook and Order classes
const { TradeBook, Order } = require('./utils'),
    GOOGLE = new TradeBook('GOOG'),
    FACEBOOK = new TradeBook('FB'),
    ORACLE = new TradeBook('ORCL');

// Server Setup
const express = require('expres'),
    port = process.env.PORT || 3000,
    app = express();
app.use(express.static('dist'));

app.listen(port, () => console.log(`Listening on port ${port}`));
