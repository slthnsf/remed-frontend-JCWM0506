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

class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    onBtSave = () => {
        let editName = this.editNama.value
        let editCategory = this.editKategori.value
        let editStock = this.editStok.value
        let editPrice = this.editHarga.value
        if( editName == '' || editCategory == '' || editStock == '' || editPrice == ''){
            alert("Lengkapi semua form")
        } else if(editStock == 0){
            alert("Isi Stock")
        } else {
            axios.patch(URL_API + `/products/${this.props.detailProduk.id}`, {
                name: editName,
                category: editCategory,
                stock: editStock,
                price: editPrice
            }).then(res => {
                console.log(res.data)
                this.props.getProductAction()
                this.props.btClose()
            }).catch(err => {
                console.log("edit err", err)
            })
        }
    }
    render() {
        console.log("detailProduk", this.props.detailProduk)
        let { name, category, stock, price } = this.props.detailProduk
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.btClose} >
                <ModalHeader toggle={this.props.btClose}>Edit Produk
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Label>Nama Produk</Label>
                        <div className="input-group ">
                            <Input type="text" defaultValue={name} innerRef={elemen => this.editNama = elemen} />
                        </div>
                        <Label>Kategori</Label>
                        <div className="input-group ">
                            <Input type="select" defaultValue={category} innerRef={elemen => this.editKategori = elemen}>
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
                            <Input type="text" defaultValue={stock} innerRef={elemen => this.editStok = elemen} />
                            {/* <Button outline color="success" type="button" size="sm" style={{ float: "right" }} >Add Stok</Button> */}

                        </FormGroup>
                        <Label>Harga</Label>
                        <div className="input-group ">
                            <Input type="text" defaultValue={price} innerRef={elemen => this.editHarga = elemen} />
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.onBtSave} color="primary" >Save</Button>{' '}
                    <Button onClick={() => this.props.btClose()} color="secondary" >Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default connect(null, {getProductAction})(ModalEdit);