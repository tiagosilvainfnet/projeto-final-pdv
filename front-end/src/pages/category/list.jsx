import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TableList } from '../../components';
import { getUser, userIsLoggedIn } from '../../services/auth';
import useSWR from 'swr'
import { fetcher } from '../../services/request';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const ListCategory = ({ setCurrentRoute }) => {
    const location =  useLocation();
    const navigate = useNavigate();
    const user = getUser();
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const { data: categories, mutate } = useSWR(`${REACT_APP_API_URL}/category?store_id=${user.store_id}&limit=${limit}&page=${page}`, fetcher)

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
                        setPage={setPage}
                        path={'category'}
                        mutate={mutate}
                        title={'Lista de categorias'}
                        columns={[
                            {
                                key: "id",
                                name: "ID",
                                primary: true
                            },
                            {
                                key: "name",
                                name: "Nome",
                                primary: false
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
                        items={categories?.rows}
                        count={categories?.count}
                    />
                </Grid>
            </Grid>
}

export default ListCategory;