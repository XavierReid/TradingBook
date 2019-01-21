import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

// Navbar component that includes the dropdown menu for choosing a stock
class Header extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(eventKey) {
        this.props.handleSelect(eventKey);
    }
    render() {
        return (
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>SFSX Trade Book Visualization</Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown
                            title="Choose a Stock"
                            id="basic-nav-dropdown"
                            eventKey={0}>
                            <MenuItem eventKey={0} onSelect={this.handleSelect}>
                                ...{' '}
                            </MenuItem>
                            {this.props.options.map((company, i) => (
                                <MenuItem
                                    key={company.ticker}
                                    eventKey={i + 1}
                                    onSelect={this.handleSelect}>
                                    {company.name}
                                </MenuItem>
                            ))}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
