class Order {
    constructor(ticker, side, price, amount) {
        this.ticker = ticker;
        this.side = side;
        this.price = price;
        this.amount = amount;
    }
}

class Share {
    constructor(price) {
        this.price = price;
        this.total = 0;
        this.orders = [];
    }

    addToBook(amount) {
        this.orders.push(amount);
        this.total += amount;
    }
    removeFromBook(amount) {
        let curr = this.getMostRecent();
        console.log(curr, amount);
        curr -= amount;
        this.total -= amount;
        if (curr <= 0) {
            this.orders.slice(0, this.orders.length - 1);
            if (curr < 0) {
                let excess = Math.abs(curr);
                this.total += excess;
                return excess;
            }
        }
        this.orders[this.orders.length - 1] = curr;
        return 0;
    }

    getMostRecent() {
        return this.orders[this.orders.length - 1];
    }
}

class Book {
    constructor(ticker) {
        this.ticker = ticker;
        this.buy = {
            topOfTheBook: [],
            shares: {}
        };
        this.sell = {
            topOfTheBook: [],
            shares: {}
        };
    }

    addOrder(order) {
        if (
            this.buy.topOfTheBook.length === 0 &&
            this.sell.topOfTheBook.length === 0
        ) {
            this[order.side].topOfTheBook.push(order.price);
            this.restShares(order);
        } else {
            if (this.checkOpposite(order)) {
                return this.executeOrder(order);
            } else {
                this.restShares(order);
                this.updateBookOrdering(order);
            }
        }
        return null;
    }

    executeOrder(order) {
        const side = order.side === 'buy' ? this.sell : this.buy;
        const length = side.topOfTheBook.length;
        const price = side.topOfTheBook[0];
        const share = side.shares[price];
        let amount;
        if (order.amount <= share.getMostRecent()) {
            amount = order.amount;
        } else {
            amount = share.getMostRecent();
        }
        let leftovers = share.removeFromBook(order.amount);
        if (leftovers > 0) {
            order.amount = leftovers;
            this.updateBookOrdering(order);
            this.restShares(order);
        }
        if (share.total === 0) {
            side.topOfTheBook = side.topOfTheBook.slice(1, length);
            delete side.shares[price];
        }
        const timestamp = () => {
            const date = Date(Date.now).toString();
            let dateArr = date.split(' ');
            return dateArr.slice(0, 5).join(' ');
        };

        let log = {
            timestamp: timestamp(),
            ticker: this.ticker,
            price: price,
            shares: amount
        };
        return log;
    }

    checkOpposite(order) {
        let side;
        if (order.side == 'buy') {
            side = this.sell;
            return Number(order.price) >= Number(side.topOfTheBook[0]);
        } else {
            side = this.buy;
            return Number(order.price) <= Number(side.topOfTheBook[0]);
        }
    }

    updateBookOrdering(order) {
        const side = this[order.side];
        if (!side.topOfTheBook.includes(order.price)) {
            side.topOfTheBook.push(order.price);
            if (order.side === 'buy') {
                side.topOfTheBook.sort((a, b) => (Number(a) - Number(b)) * -1);
            } else {
                side.topOfTheBook.sort((a, b) => Number(a) - Number(b));
            }
        }
    }

    restShares(order) {
        if (this[order.side].shares[order.price]) {
            this[order.side].shares[order.price].addToBook(order.amount);
        } else {
            const share = new Share(order.price);
            share.addToBook(order.amount);
            this[order.side].shares[order.price] = share;
        }
    }
}

const seed = book => {
    const ticker = book.ticker;
    let order1 = new Order(ticker, 'buy', 101.53, 100);
    let order2 = new Order(ticker, 'sell', 102.47, 200);
    let order3 = new Order(ticker, 'sell', 101.6, 100);
    let order4 = new Order(ticker, 'buy', 101.7, 100);
    let order5 = new Order(ticker, 'buy', 101.6, 100);
    let order6 = new Order(ticker, 'sell', 101.6, 200);
    book.addOrder(order1);
    book.addOrder(order2);
    book.addOrder(order3);
    book.addOrder(order4);
    book.addOrder(order5);
    book.addOrder(order6);
};

// const book = new Book('AAPL');
// seed(book);
// console.log(book.buy.shares);
// console.log(book.sell.shares);

module.exports = {
    Order: Order,
    TradeBook: Book,
    seed: seed
};
