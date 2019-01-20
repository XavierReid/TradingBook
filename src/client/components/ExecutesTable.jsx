import React from 'react';
import { Table } from 'react-bootstrap';

const ExecutesTable = props => {
    const columns = ['Timestamp', 'Ticker', 'Price', '# of Shares'];
    const rows = props.tableData;
    console.log(rows);

    return (
        <Table>
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map(row => (
                    <tr key={row.timestamp}>
                        <td>{row.timestamp}</td>
                        <td>{row.ticker}</td>
                        <td>{row.price}</td>
                        <td>{row.shares}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ExecutesTable;
