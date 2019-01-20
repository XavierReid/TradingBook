import React, { Component } from 'react';
import OrderForm from './OrderForm';
// import Graph from './Graph';

class TradeBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buy: {},
            sell: {},
            executed: [],
            count: 0
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
                        if (this.state.executed.length > this.state.count) {
                            this.props.handleExecutes(this.state.executed);
                            this.setState({
                                count: this.state.executed.length
                            });
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
                console.log(this.state);
                if (this.state.executed.length > this.state.count) {
                    this.props.handleExecutes(this.state.executed);
                    this.setState({
                        count: this.state.executed.length
                    });
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
