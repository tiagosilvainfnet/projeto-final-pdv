import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormView from '../../components/form-view/form-view';
import { getUser, userIsLoggedIn } from '../../services/auth';
import { _get } from '../../services/request';

const FormCategory = ({ setCurrentRoute }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [state, setState] = useState({})
    const user = getUser();

    const loadData = async () => {
        if(params.id){
            const response = await _get(`category/${params.id}`);
            setState(response.data)
        }else{
            setState({
                name: "",
                store_id: user.store_id
            })
        }
    }

    useEffect(() => {
        userIsLoggedIn(navigate, null)
        setCurrentRoute(location.pathname);
        loadData();
    }, [])

    return  <Grid container spacing={2} sx={{
                marginTop: '32px'
            }}>
                <Grid xs={0} md={1} lg={2}></Grid>
                <Grid xs={12} md={9} lg={8}>
                    <FormView
                        fields={[
                            { key: "name", label: "Nome", type: "text", size: {xs: 12, md: 12} },
                            { key: "store_id", hidden: true },
                        ]}
                        store_id={user.store_id}
                        state={state}
                        setState={setState}
                        id={params.id}
                        title={'Categoria'}
                        path={'category'}
                    />
                    </Grid>
            </Grid>
}

export default FormCategory;