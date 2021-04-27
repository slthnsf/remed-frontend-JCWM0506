import React, { useReducer } from 'react';
import {
    Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Input, InputGroup, InputGroupAddon, Dropdown, Button, Badge
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { URL_API } from './helper'



class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            badge: []
        }
    }

    componentDidMount() {
        this.handleProduct()
    }
    
    handleProduct = () => {
        axios.get(URL_API + `/products?status=available`)
        .then(res => {
            console.log("cekcek", res.data)
            let badge = res.data.length
            console.log("o", badge)
            this.setState({ badge: badge})
        }).catch(err => {
            console.log("er", err)
        })
    }

    render() {
        return (
            <div>
                <Navbar expand="md" >
                    <NavbarBrand>
                        <Link to="/">
                            <img src="https://lh3.googleusercontent.com/proxy/I4yWS_YIqDdSogpESyli5XaxPPz6DJ6nTDT-t0k-RXUblfR9OAjxjNGhFt13u-taeibxMy6IgxSLfVbJGWqbs0sGCbGy5xWS-LAGFtDXUJPo"
                                width="100px" />
                        </Link>
                    </NavbarBrand>
                    <NavbarToggler />
                    <Collapse navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to="/product-management" className="nav-link" style={{ color: 'gray', fontWeight: 'bold' }}>
                                    Produk Management <Badge color="warning">{this.state.badge}</Badge></Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ color: 'gray', fontWeight: 'bold' }}>
                                    Transaction
                            </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        {/* {
                            this.props.email &&
                            <div style={{ color: 'gray' }}>
                                Hello, {this.props.email} <Badge color="warning">{this.totalQty()}</Badge>
                            </div>
                        }
                        {
                            this.props.email ?
                                <>
                                    <Button color="link" onClick={this.props.authLogout}>Logout</Button>
                                </> :
                                <>
                                    <Link className="nav-link active" to="/login">Login</Link>
                                </>
                        } */}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = ({ productReducers }) => {
    return {
        product: productReducers.products_list
    }
}


export default connect(mapStateToProps)(NavbarComp);