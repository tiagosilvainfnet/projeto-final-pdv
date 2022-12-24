import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormView from '../../components/form-view/form-view';
import { getUser, userIsLoggedIn } from '../../services/auth';
import { _get } from '../../services/request';

const FormProduct = ({ setCurrentRoute }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [state, setState] = useState({})
    const user = getUser();
    const [categories, setCategories] = useState([])

    const loadData = async () => {
        if(params.id){
            const response = await _get(`product/${params.id}`);
            setState(response.data)
        }else{
            setState({
                name: "",
                ean: "",
                price: 0.0,
                promo_price: 0.0,
                category_id: null,
                store_id: user.store_id
            })
        }
    }

    const loadCategories = async () => {
        const response = await _get(`category?store_id=${user.store_id}&limit=100`);
        setCategories(response.data.rows)
    }

    useEffect(() => {
        userIsLoggedIn(navigate, null)
        setCurrentRoute(location.pathname);
        loadData();
        loadCategories();
    }, [])
    
    return <Grid container spacing={2} sx={{
                marginTop: '32px'
            }}>
                <Grid xs={0} md={1} lg={2}></Grid>
                <Grid xs={12} md={9} lg={8}>
                    <FormView
                        fields={[
                            { key: "name", label: "Nome", type: "text", size: {xs: 12, sm: 6}, },
                            { key: "ean", label: "Código de Barras", type: "text", size: {xs: 12, sm: 6}, length: 13 },
                            { key: "price", label: "Preço", type: "number", size: {xs: 12, sm: 6} },
                            { key: "promo_price", label: "Preço promocional", type: "number", size: {xs: 12, sm: 6} },
                            { key: "category_id", label: "Categoria", size: {xs: 12, sm: 12} },
                            { key: "store_id", hidden: true },
                        ]}
                        categories={categories}
                        store_id={user.store_id}
                        state={state}
                        setState={setState}
                        id={params.id}
                        title={'Produto'}
                        path={'product'}
                    />
                    </Grid>
            </Grid>
}

export default FormProduct;