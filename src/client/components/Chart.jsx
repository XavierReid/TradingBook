import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

const Chart = props => {
    const { sell, buy } = props;
    const data = sell.map(sellData => ({
        name: sellData[0],
        sell: sellData[1]
    }));
    buy.forEach(buyData => {
        let found = data.find(datapoint => datapoint[buyData[0]]);
        if (found) {
            found.buy = buyData[1];
        } else {
            data.push({
                name: buyData[0],
                buy: buyData[1]
            });
        }
    });

    return (
        <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="buy" fill="blue" />
            <Bar dataKey="sell" fill="red" />
        </BarChart>
    );
};

export default Chart;
