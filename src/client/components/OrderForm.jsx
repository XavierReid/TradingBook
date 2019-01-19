import React, { Component } from 'react';

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
        e.target.reset();
        const missingFields = Object.keys(this.state).some(
            key => this.state[key] === ''
        );
        if (missingFields) {
            console.log('Error: You must fill out the entire form');
        } else {
            console.log(this.state);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <select name="side" onChange={this.handleChange}>
                    <option value="">select a side</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                </select>
                <br />
                <label htmlFor="price">Price: </label>
                <input
                    type="number"
                    name="price"
                    step="0.01"
                    onChange={this.handleChange}
                />
                <br />
                <label htmlFor="shareAmount"># of Shares: </label>
                <input
                    type="number"
                    name="shareAmount"
                    onChange={this.handleChange}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default OrderForm;
