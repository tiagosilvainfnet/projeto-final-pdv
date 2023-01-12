import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr'
import { TableList } from '../../components';

import { getUser, userIsLoggedIn } from '../../services/auth';
import { fetcher } from '../../services/request';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const ListProduct = ({ setCurrentRoute }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = getUser();
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const { data: products, mutate } = useSWR(`${REACT_APP_API_URL}/product?store_id=${user.store_id}&limit=${limit}&page=${page}`, fetcher)

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
                        setPage={setPage}
                        setLimit={setLimit}
                        mutate={mutate}
                        path={'product'}
                        title={'Lista de produtos'}
                        columns={[
                            {
                                key: "id",
                                name: "ID",
                                primary: true
                            },
                            {
                                key: "ean",
                                name: "Código de Barra",
                                primary: false
                            },
                            {
                                key: "name",
                                name: "Nome",
                                primary: false
                            },
                            {
                                key: "price",
                                name: "Preço",
                                primary: false,
                                money: true
                            },
                            {
                                key: "promo_price",
                                name: "Preço promocional",
                                primary: false,
                                money: true
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
                        count={products?.count}
                        items={products?.rows}
                    />
                </Grid>
            </Grid>
}

export default ListProduct;