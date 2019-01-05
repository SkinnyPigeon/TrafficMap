import React, {Component} from 'react';
import styled from 'styled-components';
import logo from '../TrafficMap-logo.png';

const NavBar = styled.div`
    background-color: #FFFFFF;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const StyledLogo = styled.img`
    height: 90px;
    width: auto;
`;

const StyledHeader = styled.h4`
    color: rgba(0, 0, 0, 0.4);
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.6);
    margin-right 10px;
`;

class Header extends Component {
    render() {
        const {count} = this.props;
        return(
            <NavBar>
                <StyledLogo src={logo} />
                <StyledHeader>{count.toLocaleString()} Traffic Incidents</StyledHeader>
            </NavBar>
        );
    }
}

export default Header;