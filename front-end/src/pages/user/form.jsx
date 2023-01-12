import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormView from '../../components/form-view/form-view';
import { getUser, userIsLoggedIn } from '../../services/auth';
import { _get } from '../../services/request';

const FormUser = ({ setCurrentRoute }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [state, setState] = useState({})
    const user = getUser();

    const loadData = async () => {
        if(params.id){
            const response = await _get(`user/${params.id}`);
            setState(response.data)
        }else{
            setState({
                email: "",
                password: "",
                store_id: user.store_id,
                role_id: 3,
                active: true,
            })
        }
    }

    useEffect(() => {
        userIsLoggedIn(navigate, null)
        setCurrentRoute(location.pathname);
        loadData()
    }, [])
    
    return <Grid container spacing={2} sx={{
                marginTop: '32px'
            }}>
                <Grid xs={0} md={1} lg={2}></Grid>
                <Grid xs={12} md={9} lg={8}>
                    <FormView
                        fields={[
                            { key: "email", label: "E-mail", type: "email", size: {xs: 12, md: 12} },
                            { key: "password", label: "Senha", type: "text", size: {xs: 12, md: 12} },
                            { key: "store_id", hidden: true },
                            { key: "role_id", hidden: true },
                            { key: "active", hidden: true },
                        ]}
                        store_id={user.store_id}
                        state={state}
                        setState={setState}
                        id={params.id}
                        title={'Usuário'}
                        path={'user'}
                    />
                    </Grid>
            </Grid>
}

export default FormUser;