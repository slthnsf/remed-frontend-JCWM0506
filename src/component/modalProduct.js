import axios from 'axios';
import React from 'react';
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form, FormGroup, Label, Input, Badge, Alert
} from "reactstrap";
import { URL_API } from './helper'
import { getProductAction } from '../actions'
import { connect } from 'react-redux';

class ModalProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    getDate = () => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}/${month}/${date}`
    }

    onBtAdd = () => {
        let date = this.getDate()
        let name = this.addNama.value
        let coba = Date.now()
        let cek = coba.toString()
        let cek2 = parseInt(cek.slice(5,12))
        console.log(cek2)
        let serial = cek2
        let stok = parseInt(this.addStok.value)
        let kategori = this.addKategori.value
        let harga = parseInt(this.addHarga.value)
        console.log(date, name, serial, stok, kategori, harga)
        if(name == '' || stok == '' || kategori == '' || harga == ''){
            alert("Lengkapi semua form")
        } else if (stok == 0){
            alert("Masukkan Stok")
        } else {
            if(stok !== 0){
                axios.post(URL_API + '/products', {
                    date: date,
                    name: name,
                    serial: serial,
                    stock: stok,
                    category: kategori,
                    price: harga,
                    status: "available"
                }).then(res => {
                    console.log("add", res.data)
                    this.props.getProductAction()
                    this.props.btClose()
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
    render() { 
        return ( 
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.btClose} >
                    <ModalHeader toggle={this.props.btClose}>Add Product
                </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Label>Nama Produk</Label>
                            <div className="input-group ">
                                <Input type="text" innerRef={elemen => this.addNama = elemen} />
                            </div>
                            <Label>Kategori</Label>
                            <div className="input-group ">
                                <Input type="select" innerRef={elemen => this.addKategori = elemen}>
                                    <option disabled selected>Pilih Kategori</option>
                                    <option>Electronic</option>
                                    <option>Handphone</option>
                                    <option>Furniture</option>
                                    <option>Beauty</option>
                                    <option>Fashion</option>
                                    <option>Food and Drink</option>
                                </Input>
                            </div>
                            <FormGroup>
                                <Label>Stok</Label>
                                <Input type="text" innerRef={elemen => this.addStok = elemen} />
                                {/* <Button outline color="success" type="button" size="sm" style={{ float: "right" }} >Add Stok</Button> */}

                            </FormGroup>
                            <Label>Harga</Label>
                            <div className="input-group ">
                                <Input type="text" innerRef={elemen => this.addHarga = elemen} />
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.onBtAdd} color="primary" >Add Product</Button>{' '}
                        <Button onClick={() => this.props.btClose()} color="secondary" >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
         );
    }
}
 
export default connect(null, {getProductAction})(ModalProduct);