import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const Chart = props => {
    const { sell, buy } = props;
    const generate = () => {
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
    };
    const data = generate();

    return (
        <BarChart
            width={600}
            height={300}
            data={data}
            // margin={{ top: 10, right: 0, left: 30, bottom: 10 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
                wrapperStyle={{
                    width: 100,
                    backgroundColor: '#ccc'
                }}
            />
            <Legend />
            <Bar dataKey="buy" fill="blue" />
            <Bar dataKey="sell" fill="red" />
        </BarChart>
    );
};

export default Chart;
