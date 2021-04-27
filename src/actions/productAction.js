import axios from "axios"
import { URL_API } from "../component/helper"

export const getProductAction = () => {
    return (dispatch) => {
        axios.get(URL_API + '/products')
        .then(res => {
            console.log("get produk", res.data)
            dispatch({
                type: "GET_PRODUCT",
                payload: res.data
            })
        }).catch(err => {
            console.log("get product err", err)
        })
    }
}