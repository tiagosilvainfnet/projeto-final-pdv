import { get, post } from "./request"
import { getData } from "./storage";

const getProduct = async (store_id, page, search) => {
    let params = {
        limit: 20,
        page,
        store_id
    }

    if(search){
        params.search = search;
    }
    const result = await get('product/', params)
    
    return result.data.rows
}

const getCupom = async (store_id, page) => {
    let params = {
        limit: 20,
        page,
        store_id
    }
    const result = await get('seller/', params)
    return result.data.rows
}

const getCupomData = async (id) => {
    const result = await get(`seller/${id}`, {})
    return result.data.rows
}

const venda = async (total, payments, cart, troco) => {
    const user = await getData('user', true);

    const response = await post('seller', { 
        total, 
        payments, 
        cart, 
        troco,
        employee_id: user.id,
        store_id: user.store_id
    });
    
    const { data, status } = response;
    return {
        data,
        status
    };
}

export {
    getProduct, getCupom, getCupomData, venda
}