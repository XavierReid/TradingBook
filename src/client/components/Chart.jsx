import React from 'react';
import RestingOrders from './RestingOrders';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

// generates chart data based on the sell and buy shares of a given TradeBook
function generate(buy, sell) {
    const data = sell.map(sellData => ({
        name: sellData[0],
        sell: sellData[1].total
    }));
    buy.forEach(buyData => {
        let found = data.find(datapoint => datapoint[buyData[0]]);
        if (found) {
            found.buy = buyData[1].total;
        } else {
            data.push({
                name: buyData[0],
                buy: buyData[1].total
            });
        }
    });
    return data;
}

const Chart = props => {
    const { sell, buy } = props;
    const data = generate(buy, sell);
    data.sort((a, b) => Number(a.name) - Number(b.name));
    console.log('SORTED', data);

    return (
        <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
                wrapperStyle={{
                    backgroundColor: 'white',
                    padding: 5,
                    color: 'gray'
                }}
                content={<RestingOrders sell={sell} buy={buy} />}
            />
            <Legend />
            <Bar dataKey="buy" fill="blue" />
            <Bar dataKey="sell" fill="red" />
        </BarChart>
    );
};

export default Chart;
