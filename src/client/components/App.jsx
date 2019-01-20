import React, { Component } from 'react';
import TradeBook from './TradeBook';

class App extends Component {
    render() {
        return (
            <div>
                Trading Block!
                <TradeBook ticker={'GOOG'} />
            </div>
        );
    }
}

export default App;
