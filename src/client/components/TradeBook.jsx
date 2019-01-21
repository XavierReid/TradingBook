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
            sell: []
        };
        this.handleBookUpdate = this.handleBookUpdate.bind(this);
        this.getStockData = this.getStockData.bind(this);
    }

    // Updates the TradeBook component when a user switches from one stock to another
    componentDidUpdate(nextProps) {
        if (this.props.company.ticker !== nextProps.company.ticker) {
            this.setState({
                buy: [],
                sell: []
            });
            this.getStockData(this.props.company.ticker);
        }
    }
    componentDidMount() {
        this.getStockData(this.props.company.ticker);
    }

    // Retrieves a stock's TradeBook data from the backend
    getStockData(ticker) {
        fetch(`/tradeBook/${ticker}`)
            .then(res => res.json())
            .then(data => {
                this.handleBookUpdate(data);
            });
    }
    
    // Updates the TradeBook info whenever an order is submitted
    handleBookUpdate(data) {
        const { book, transaction } = data;
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
            },
            () => {
                console.log(this.props.company.ticker, this.state);
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
                        {this.props.company.name} ({this.props.company.ticker}){' '}
                        <small>trade book</small>
                    </PageHeader>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        {buy.length === 0 && sell.length === 0 ? null : (
                            <Chart buy={buy} sell={sell} />
                        )}
                    </Col>
                    <Col sm={12} mdOffset={1} md={5}>
                        <OrderForm
                            ticker={this.props.company.ticker}
                            handleUpdate={this.handleBookUpdate}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default TradeBook;
