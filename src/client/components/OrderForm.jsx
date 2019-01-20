import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'react-bootstrap';

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side: '',
            price: '',
            shareAmount: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const missingFields = Object.keys(this.state).some(
            key => this.state[key] === ''
        );
        if (missingFields) {
            console.log('Error: You must fill out the entire form');
        } else {
            const data = JSON.stringify(this.state);
            fetch(`/addNewOrder/${this.props.ticker}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.props.handleUpdate(data);
                });
        }
        e.target.reset();
        this.setState({
            side: '',
            price: '',
            shareAmount: ''
        });
    }

    render() {
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormGroup>
                    <ControlLabel>Side</ControlLabel>{' '}
                    <FormControl
                        componentClass="select"
                        name="side"
                        onChange={this.handleChange}>
                        <option value="">select a side</option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </FormControl>
                </FormGroup>{' '}
                <FormGroup controlId="formInlinePrice">
                    <ControlLabel>Price</ControlLabel>{' '}
                    <FormControl
                        type="number"
                        step="0.01"
                        min="0"
                        name="price"
                        onChange={this.handleChange}
                    />
                </FormGroup>{' '}
                <FormGroup controlId="formInlineShareAmount">
                    <ControlLabel># of Shares</ControlLabel>{' '}
                    <FormControl
                        type="number"
                        min="0"
                        name="shareAmount"
                        onChange={this.handleChange}
                    />
                </FormGroup>{' '}
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}

export default OrderForm;
