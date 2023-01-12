import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TableList } from '../../components';
import { getUser, userIsLoggedIn } from '../../services/auth';
import useSWR from 'swr'
import { fetcher } from '../../services/request';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const ListUser = ({ setCurrentRoute }) => {
    const location =  useLocation();
    const navigate = useNavigate();
    const user = getUser();
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const { data: users, mutate } = useSWR(`${REACT_APP_API_URL}/user?store_id=${user.store_id}&limit=${limit}&page=${page}`, fetcher)

    useEffect(() => {
        userIsLoggedIn(navigate, null)
        setCurrentRoute(location.pathname);
    }, [])
    
    return <Grid container spacing={2} sx={{
        marginTop: '32px'
    }}>
                <Grid xs={0} md={1} lg={2}></Grid>
                <Grid xs={12} md={9} lg={8}>
                    <TableList 
                        limit={limit}
                        setLimit={setLimit}
                        mutate={mutate}
                        setPage={setPage}
                        path={'user'}
                        title={'Lista de usuários'}
                        columns={[
                            {
                                key: "id",
                                name: "ID",
                                primary: true
                            },
                            {
                                key: "email",
                                name: "E-mail",
                                primary: false
                            },
                            {
                                key: "role_id",
                                name: "Função",
                                primary: false,
                                field: (row) => row.role_id == 2 ? 'Gerente' : 'Funcionário' 
                            },
                            {
                                key: "active",
                                name: "Status",
                                primary: false,
                                field: (row) => row.active ? <TaskAltIcon color="success"/> : <HighlightOffIcon color="error"/>
                             },
                            {
                                key: "createdAt",
                                name: "Data criação",
                                primary: false,
                                formatDate: 'DD/MM/YYYY HH:mm:ss'
                            },
                            {
                                key: "updatedAt",
                                name: "Data edição",
                                primary: false,
                                formatDate: 'DD/MM/YYYY HH:mm:ss'
                            },
                        ]}
                        count={users?.count}
                        items={users?.rows}
                    />
                </Grid>
            </Grid>
}

export default ListUser;