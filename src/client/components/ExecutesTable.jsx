import React from 'react';
import { Table } from 'react-bootstrap';

const ExecutesTable = props => {
    const columns = ['Timestamp', 'Ticker', 'Price', '# of Shares'];
    const rows = props.tableData;
    console.log(rows);

    return (
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => (
                    <tr key={`${row.timestamp}:${i}`}>
                        <td>{row.timestamp}</td>
                        <td>{row.ticker}</td>
                        <td>${row.price.toFixed(2)}</td>
                        <td>{row.shares}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ExecutesTable;
