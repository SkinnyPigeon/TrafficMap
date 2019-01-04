import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
  } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        }
    }
    
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        })
    }
    
    render() {
        return(
            <Navbar color="light" light expand="md">
            <NavbarBrand href="/">TrafficMap</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    1,000 Traffic Incidents Today
                </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
        );
    }
}

export default Header;