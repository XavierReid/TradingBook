import React from 'react';
import { Table } from 'react-bootstrap';

// Table component for dislaying all the orders that have been executed
const ExecutesTable = props => {
    const columns = ['Timestamp', 'Ticker', 'Price', 'Shares'];
    const rows = props.tableData;

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
