import React, { Component } from 'react';
import OrderForm from './OrderForm';
import Chart from './Chart';

class TradeBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buy: [],
            sell: [],
            transactions: [],
            count: 0
        };
        this.handleBookUpdate = this.handleBookUpdate.bind(this);
    }
    componentDidMount() {
        fetch(`/tradeBook/${this.props.ticker}`)
            .then(res => res.json())
            .then(data => {
                this.handleBookUpdate(data);
            });
    }

    handleBookUpdate(data) {
        const sellData = Object.keys(data.sell.shares).map(key => [
            Number(key).toFixed(2),
            data.sell.shares[key]
        ]);
        const buyData = Object.keys(data.buy.shares).map(key => [
            Number(key).toFixed(2),
            data.buy.shares[key]
        ]);

        this.setState(
            {
                buy: buyData,
                sell: sellData,
                transactions: data.executed
            },
            () => {
                console.log(this.state);
                if (this.state.transactions.length > this.state.count) {
                    this.props.handleExecutes(this.state.transactions);
                    this.setState({
                        count: this.state.transactions.length
                    });
                }
            }
        );
    }

    render() {
        const { buy, sell } = this.state;
        return (
            <div>
                <h4>{this.props.ticker}</h4>
                {buy.length === 0 && sell.length === 0 ? null : (
                    <Chart buy={buy} sell={sell} />
                )}
                <OrderForm
                    ticker={this.props.ticker}
                    handleUpdate={this.handleBookUpdate}
                />
            </div>
        );
    }
}

export default TradeBook;
