import React, { Component } from 'react';
import TradeBook from './TradeBook';
import ExecutesTable from './ExecutesTable';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            executedOrders: []
        };
        this.handleExecutes = this.handleExecutes.bind(this);
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

    render() {
        return (
            <div>
                Trading Block!
                <TradeBook
                    ticker={'GOOG'}
                    handleExecutes={this.handleExecutes}
                />
                <ExecutesTable tableData={this.state.executedOrders} />
            </div>
        );
    }
}

export default App;
