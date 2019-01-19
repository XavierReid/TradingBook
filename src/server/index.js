class Order {
    constructor(ticker, side, price, amount) {
        this.ticker = ticker;
        this.side = side;
        this.price = price;
        this.amount = amount;
    }

    getPrice() {
        return `$${this.price}`;
    }
}

class Book {
    constructor(ticker) {
        this.ticker = ticker;
        this.buy = {
            topOfTheBook: [],
            rests: {}
        };
        this.sell = {
            topOfTheBook: [],
            rests: {}
        };
        this.executed = [];
    }

    addOrder(order) {
        if (this[order.side].topOfTheBook.length === 0) {
            this[order.side].topOfTheBook.push(order.price);
            this.restShares(order);
        } else {
            if (this.checkOpposite(order)) {
                this.executeOrder(order);
            } else {
                this.updateBookOrdering(order);
                this.restShares(order);
            }
        }
    }

    executeOrder(order) {
        const side = order.side === 'buy' ? this.sell : this.buy;
        const length = side.topOfTheBook.length;
        const price = side.topOfTheBook[0];
        if (order.amount <= side.rests[price]) {
            side.rests[price] -= order.amount;
            if (side.rests[price] === 0) {
                side.topOfTheBook = side.topOfTheBook.slice(1, length);
                delete side.rests[price];
            }
        } else {
            order.amount -= side.rests[price];
            this.restShares(order);
            side.topOfTheBook = side.topOfTheBook.slice(1, length);
            delete side.rests[price];
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
            shares: order.amount
        };
        this.executed.push(log);
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
        side.topOfTheBook.push(order.price);
        if (order.side === 'buy') {
            side.topOfTheBook.sort((a, b) => (Number(a) - Number(b)) * -1);
        } else {
            side.topOfTheBook.sort((a, b) => Number(a) - Number(b));
        }
    }

    restShares(order) {
        if (this[order.side].rests[order.price]) {
            this[order.side].rests[order.price] += order.amount;
        } else {
            this[order.side].rests[order.price] = order.amount;
        }
    }
}

let apple = new Book('AAPL');
let order1 = new Order('AAPL', 'buy', 101.53, 100);
let order2 = new Order('AAPL', 'sell', 102.47, 200);
let order3 = new Order('AAPL', 'sell', 101.6, 100);
let order4 = new Order('AAPL', 'buy', 101.7, 100);
let order5 = new Order('AAPL', 'buy', 101.6, 100);
let order6 = new Order('AAPL', 'sell', 101.6, 200);
apple.addOrder(order1);
apple.addOrder(order2);
apple.addOrder(order3);
apple.addOrder(order4);
setTimeout(() => {
    apple.addOrder(order5);
    apple.addOrder(order6);
    console.log(apple);
}, 1000);
