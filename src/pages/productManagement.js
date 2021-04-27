import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Input, Alert, ModalHeader, ModalFooter } from 'reactstrap';
import ModalDelete from '../component/modalDelete';
import ModalEdit from '../component/modalEdit';
import ModalProduct from '../component/modalProduct';

class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalEdit: false,
            detailProduk: {},
            modalDelete: false
        }
    }

    printProduk = () => {
        console.log("cek produk", this.props.product)
        return this.props.product.map((item, index) => {
            if(item.stock !== 0){
                return (
                    <tr>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>{item.serial}</td>
                        <td>{item.stock}</td>
                        <td>{item.price.toLocaleString()}</td>
                        <td>
                        <Button outline color="success" onClick={() => this.setState({ detailProduk: item, modalEdit: !this.state.modalEdit })} >Edit</Button>
                        <Button outline color="danger" onClick={() => this.setState({ detailProduk: item, modalDelete: !this.state.modalDelete })} >Delete</Button>
                        </td>
                    </tr>
                )
            }
        })

    }
    render() {
        return (
            <div className="container">
                <div>
                    <h2 className="text-center">Product Management</h2>
                    <Button color="success" onClick={() => this.setState({ modal: !this.state.modal })}>Add Product</Button>
                    <ModalProduct modal={this.state.modal}
                        btClose={() => this.setState({ modal: !this.state.modal })} />
                    <ModalEdit modal={this.state.modalEdit} detailProduk={this.state.detailProduk}
                        btClose={() => this.setState({ modalEdit: !this.state.modalEdit })} />
                    <ModalDelete modal={this.state.modalDelete} detailProduk={this.state.detailProduk}
                        btClose={() => this.setState({ modalDelete: !this.state.modalDelete })}/>
                </div>
                <Table hover style={{ textAlign: "center", alignContent: "center" }}>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Nama produk</th>
                            <th>Serial Number(SN)</th>
                            <th>Stok</th>
                            <th>Harga</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printProduk()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = ({ productReducers }) => {
    return {
        product: productReducers.products_list
    }
}

export default connect(mapStateToProps)(ProductManagement);