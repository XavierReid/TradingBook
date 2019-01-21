import React from 'react';

// A component for displaying the list of resting orders at a given price
// Is displayed when the user hovers over the corresponding bar on the chart
const RestingOrders = (props) => {
        const { active } = props;
        if (active) {
            const { label, sell, buy, payload } = props;
            const dataKey = payload[0].dataKey;
            let orders;
            let share;
            if (dataKey === 'sell') {
                share = sell.find(shares => shares[0] === label);
                orders = share[1].orders;
            } else {
                share = buy.find(shares => shares[0] === label);
                orders = share[1].orders;
            }
            return (
                <div className="custom-tooltip">
                    <p>
                        ${label} : {payload[0].value} available
                    </p>
                    <p>Current Resting Orders:</p>
                    <ul>
                        {orders.map((order, i) => (
                            <li key={i}>{order} shares</li>
                        ))}
                    </ul>
                </div>
            );
        }
        return null;
};

export default RestingOrders;