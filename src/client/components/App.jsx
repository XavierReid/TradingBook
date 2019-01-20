import React, { Component } from 'react';
import TradeBook from './TradeBook';
import ExecutesTable from './ExecutesTable';
import Header from './Header';
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

    handleExecutes(data) {
        const length = data.length;
        const latest = data[length - 1];
        const { executedOrders } = this.state;
        executedOrders.push(latest);
        this.setState({
            executedOrders: executedOrders
        });
    }

    handleNavClick(eventKey) {
        this.setState({ toDisplay: eventKey });
    }

    render() {
        const display = [
            null,
            <TradeBook ticker={'GOOG'} handleExecutes={this.handleExecutes} />,
            <TradeBook ticker={'FB'} handleExecutes={this.handleExecutes} />,
            <TradeBook ticker={'ORCL'} handleExecutes={this.handleExecutes} />
        ];
        return (
            <div>
                <Header handleSelect={this.handleNavClick} />
                {display[this.state.toDisplay]}
                <ExecutesTable tableData={this.state.executedOrders} />
            </div>
        );
    }
}

export default App;
