import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TableList } from '../../components';
import { getUser, userIsLoggedIn } from '../../services/auth';
import useSWR from 'swr'
import { fetcher } from '../../services/request';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PixIcon from '@mui/icons-material/Pix';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const ListSeller = ({ setCurrentRoute }) => {
    const location =  useLocation();
    const navigate = useNavigate();
    const user = getUser();
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const { data: sellers, mutate } = useSWR(`${REACT_APP_API_URL}/seller?store_id=${user.store_id}&limit=${limit}&page=${page}`, fetcher)

    useEffect(() => {
        userIsLoggedIn(navigate, null)
        setCurrentRoute(location.pathname);
    }, [])

    const iconStyle = {
        float: 'left',
        marginRight: '5px'
    }

    const generateType = (type) => {
        let payment = '';
        switch (type) {
            case 1:
            payment = <><LocalAtmIcon style={iconStyle}/> <Typography>Dinheiro</Typography></>;
            break;

            case 2:
            payment = <><CreditCardIcon style={iconStyle}/> <Typography>Cartão de Crédito</Typography></>;
            break;

            case 3:
            payment = <><CreditCardIcon style={iconStyle}/> <Typography>Cartão de Débito</Typography></>;
            break;

            case 4:
            payment = <><PixIcon style={iconStyle}/> <Typography>Pix</Typography></>;
            break;
        }

        return payment;
    }
    
    return <Grid container spacing={2} sx={{
        marginTop: '32px'
    }}>
                <Grid xs={0} md={1} lg={2}></Grid>
                <Grid xs={12} md={9} lg={8}>
                    <TableList 
                        addButton={false}
                        noModify={true}
                        limit={limit}
                        setLimit={setLimit}
                        setPage={setPage}
                        mutate={mutate}
                        path={'user'}
                        title={'Lista de vendas'}
                        columns={[
                            {
                                key: "id",
                                name: "ID",
                                primary: true
                            },
                            {
                                key: "total",
                                name: "Total",
                                primary: false,
                                money: true
                            },
                            {
                                key: "discount",
                                name: "Desconto",
                                primary: false,
                                money: true
                            },
                            {
                                key: "type",
                                name: "Tipo de Venda",
                                primary: false,
                                field: (row) => generateType(row.type)
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
                        count={sellers?.count}
                        items={sellers?.rows}
                    />
                </Grid>
            </Grid>
}

export default ListSeller;