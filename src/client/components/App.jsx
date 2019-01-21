import React, { Component } from 'react';
import TradeBook from './TradeBook';
import ExecutesTable from './ExecutesTable';
import Header from './Header';
import { Grid, Row, Col } from 'react-bootstrap';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            executedOrders: [],
            toDisplay: 0
        };
        this.handleExecutes = this.handleExecutes.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);
    }
    handleExecutes(transaction) {
        const { executedOrders } = this.state;
        executedOrders.push(transaction);
        this.setState(
            {
                executedOrders: executedOrders
            },
            () => {
                console.log(this.state.executedOrders);
            }
        );
    }

    handleNavClick(eventKey) {
        this.setState({ toDisplay: eventKey });
    }

    render() {
        const { toDisplay } = this.state;
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col xs={12} md={12}>
                            <Header
                                options={this.props.options}
                                handleSelect={this.handleNavClick}
                            />
                        </Col>
                    </Row>
                    <Row>
                        {toDisplay === 0 ? null : (
                            <TradeBook
                                company={this.props.options[toDisplay - 1]}
                                handleExecutes={this.handleExecutes}
                            />
                        )}
                    </Row>
                    <Row>
                        <Col md={12}>
                            <ExecutesTable
                                tableData={this.state.executedOrders}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
