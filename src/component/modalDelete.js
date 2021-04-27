import axios from 'axios';
import React from 'react';
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form, FormGroup, Label, Input, Badge
} from "reactstrap";
import { URL_API } from './helper';
import { getProductAction } from '../actions'
import { connect } from 'react-redux';

class ModalDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    onBtDelete = () => {
        // console.log("cik", this.props.detailProduk)
        axios.patch(URL_API + `/products/${this.props.detailProduk.id}`, {
            status: "non-available",
            stock: 0
        }).then(res=> {
            this.props.getProductAction()
            this.props.btClose()
        }).catch(err => {
            console.log("err del", err)
        })
    }

    render() { 
        return ( 
            <Modal isOpen={this.props.modal} toggle={this.props.btClose}>
                <ModalHeader toggle={this.props.btClose} >Confirmation</ModalHeader>
                <ModalBody>Are you sure wanna delete this product?</ModalBody>
                <ModalFooter>
                <Button onClick={this.onBtDelete} color="primary" >Yes, Delete</Button>
                </ModalFooter>
            </Modal>
         );
    }
}
 
export default connect(null, {getProductAction})(ModalDelete);