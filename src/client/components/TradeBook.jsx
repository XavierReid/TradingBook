import React, { Component } from 'react';
import OrderForm from './OrderForm';
import Chart from './Chart';
import { PageHeader } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';

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
        this.getStockData = this.getStockData.bind(this);
    }

    componentDidUpdate(nextProps) {
        if (this.props.ticker !== nextProps.ticker) {
            this.setState({
                buy: [],
                sell: []
                // transactions: [],
                // count: 0
            });
            this.getStockData(this.props.ticker);
        }
    }
    componentDidMount() {
        this.getStockData(this.props.ticker);
    }

    getStockData(ticker) {
        fetch(`/tradeBook/${ticker}`)
            .then(res => res.json())
            .then(data => {
                this.handleBookUpdate(data);
            });
    }

    handleBookUpdate(data) {
        const { book, transaction } = data;
        console.log(data);
        
        const sellData = Object.keys(book.sell.shares).map(key => [
            Number(key).toFixed(2),
            book.sell.shares[key]
        ]);
        const buyData = Object.keys(book.buy.shares).map(key => [
            Number(key).toFixed(2),
            book.buy.shares[key]
        ]);

        this.setState(
            {
                buy: buyData,
                sell: sellData
                // transactions: data.executed
            },
            () => {
                console.log(this.props.ticker, this.state);
                // if (this.state.transactions.length > this.state.count) {
                //     this.props.handleExecutes(this.state.transactions);
                //     this.setState({
                //         count: this.state.transactions.length
                //     });
                // }
                if (transaction) {
                    this.props.handleExecutes(transaction);
                }
            }
        );
    }

    render() {
        const { buy, sell } = this.state;
        return (
            <Grid>
                <Row>
                    <PageHeader>
                        <Col mdOffset={4}>
                            {this.props.ticker} <small>trade book</small>
                        </Col>
                    </PageHeader>
                </Row>
                <Row>
                    <Col mdOffset={1} md={6}>
                        {buy.length === 0 && sell.length === 0 ? null : (
                            <Chart buy={buy} sell={sell} />
                        )}
                    </Col>
                </Row>
                <Row>
                    <OrderForm
                        ticker={this.props.ticker}
                        handleUpdate={this.handleBookUpdate}
                    />
                </Row>
            </Grid>
        );
    }
}

export default TradeBook;
