import React, { Component } from 'react';
import OrderForm from './OrderForm';
// import Graph from './Graph';

class TradeBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buy: {},
            sell: {},
            executed: []
        };
        this.handleBookUpdate = this.handleBookUpdate.bind(this);
    }
    componentDidMount() {
        fetch(`/tradeBook/${this.props.ticker}`)
            .then(res => res.json())
            .then(data => {
                this.setState(
                    {
                        buy: data.buy,
                        sell: data.sell,
                        executed: data.executed
                    },
                    () => {
                        if (this.state.executed.length > 0) {
                            this.props.handleExecutes(this.state.executed);
                        }
                    }
                );
            });
    }

    handleBookUpdate(data) {
        this.setState(
            {
                buy: data.buy,
                sell: data.sell,
                executed: data.executed
            },
            () => {
                if (this.state.executed.length > 0) {
                    this.props.handleExecutes(this.state.executed);
                }
            }
        );
    }

    render() {
        return (
            <div>
                <h2>{this.props.ticker}</h2>
                {/* <Graph /> */}
                <OrderForm
                    ticker={this.props.ticker}
                    handleUpdate={this.handleBookUpdate}
                />
            </div>
        );
    }
}

export default TradeBook;
