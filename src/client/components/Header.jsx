import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
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
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>SFSX Trading Block</Navbar.Brand>
                    <Nav>
                        <NavDropdown
                            title="Choose a Stock"
                            id="basic-nav-dropdown"
                            eventKey={0}>
                            <MenuItem eventKey={0} onSelect={this.handleSelect}>
                                ...{' '}
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={1} onSelect={this.handleSelect}>
                                Google
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={2} onSelect={this.handleSelect}>
                                Facebook
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3} onSelect={this.handleSelect}>
                                Oracle
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Header>
            </Navbar>
        );
    }
}

export default Header;
