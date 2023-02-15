import { get } from "./request"

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

export {
    getProduct, getCupom, getCupomData
}