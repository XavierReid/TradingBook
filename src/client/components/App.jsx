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
        // const length = data.length;
        // const latest = data[length - 1];
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
        const options = ['GOOG', 'FB', 'ORCL'];
        const { toDisplay } = this.state;
        return (
            <div>
                <Header handleSelect={this.handleNavClick} />
                <Grid>
                    <Row>
                        {toDisplay === 0 ? null : (
                            <TradeBook
                                ticker={options[toDisplay - 1]}
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
