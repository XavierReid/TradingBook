import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Col,
    Alert
} from 'react-bootstrap';

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side: '',
            price: '',
            shareAmount: '',
            show: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleDismiss() {
        this.setState({ show: false });
    }

    // Updates form info
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }
    // Submits stock order to the TradeBook, where it is either executed or added to resting shares
    handleSubmit(e) {
        e.preventDefault();
        this.handleDismiss();
        const missingFields = Object.keys(this.state).some(
            key => this.state[key] === ''
        );
        if (missingFields) {
            console.log('Error: You must fill out the entire form');
            this.handleShow();
        } else {
            const data = JSON.stringify(this.state);
            fetch(`/tradeBook/${this.props.ticker}`, {
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
            <div>
                {!this.state.show ? null : (
                    <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                        <h4>Error: You must fill out the entire form!!!</h4>
                        <p>
                            A side wasn't selected, a price wasn't determined,
                            and/or an amount wasn't chosen.
                        </p>
                    </Alert>
                )}

                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2}>
                            Side
                        </Col>
                        <Col md={6}>
                            <FormControl
                                componentClass="select"
                                name="side"
                                onChange={this.handleChange}>
                                <option value="">select a side</option>
                                <option value="buy">Buy</option>
                                <option value="sell">Sell</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formInlinePrice">
                        <Col componentClass={ControlLabel} md={2}>
                            Price
                        </Col>
                        <Col md={6}>
                            <FormControl
                                type="number"
                                step="0.01"
                                min="0"
                                name="price"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formInlineShareAmount">
                        <Col componentClass={ControlLabel} md={2}>
                            # of Shares
                        </Col>
                        <Col md={6}>
                            <FormControl
                                type="number"
                                min="0"
                                name="shareAmount"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col mdOffset={2} md={6}>
                            <Button type="submit">Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default OrderForm;
