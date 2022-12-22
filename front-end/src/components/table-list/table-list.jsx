import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';

import moment from 'moment';
import { _delete } from '../../services/request';

const TableList = ({ mutate, path, columns, items, title, limit, setLimit, count, setPage }) => {
    const navigate = useNavigate();
    const cols = [
                    ...columns,
                    ...[
                        {
                            key: "action",
                            name: "Ações",
                            primary: false
                        }
                    ]
                ]

    const deleteElement = async (id) => {
        const conf = window.confirm("Deseja mesmo deletar?");
        if(conf){
            try{
                await _delete(path, id);
                alert('Elemento deletado com sucesso!')
                mutate();
            }catch(err){
                alert("Erro ao deletar elemento.")
            }
        }
    }
        
    return <Box>
                <Box style={{
                    marginBottom: '32px'
                }}>
                    <Typography component={'h1'} variant={'h4'}>{title}</Typography>
                </Box>
                <Box style={{
                        maxHeight: 'calc(100vh - 270px)',
                        overflow: 'auto'
                    }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {
                                        cols.map(column => <TableCell>{column.name}</TableCell>)
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { 
                                    items ? items?.map(item => <TableRow> { cols.map(column => {
                                        if(column.key === 'action'){
                                            return <TableCell scope="row">
                                                        <IconButton color="info" aria-label="edit" onClick={() => navigate(`edit/${item.id}`)}>
                                                            <EditIcon />
                                                        </IconButton> 
                                                        <IconButton color="error" aria-label="delete" onClick={async () => await deleteElement(item.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>                                       
                                                </TableCell>
                                        }else{
                                            if(column.field !== undefined){
                                                return <TableCell component={column.primary ? "th" : "td"} scope="row">{column.field(item)}</TableCell>
                                            }else{
                                                if(column.formatDate !== undefined){
                                                    return <TableCell component={column.primary ? "th" : "td"} scope="row">{moment(item[column.key]).format(column.formatDate)}</TableCell>
                                                }else{
                                                    if(column.money !== undefined){
                                                        return <TableCell component={column.primary ? "th" : "td"} scope="row">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item[column.key])}</TableCell>
                                                    }else{
                                                        return <TableCell component={column.primary ? "th" : "td"} scope="row">{item[column.key]}</TableCell>
                                                    }
                                                }
                                            }
                                        }
                                    }) } </TableRow>) : "" 
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box style={{
                    float: 'left',
                    marginTop: '20px',
                    width: '400px'
                }} spacing={2}>
                    <Pagination 
                        showFirstButton
                        showLastButton
                        onChange={(event, value) => setPage(value)} count={Math.ceil(count / limit)} variant="outlined" />
                </Box>
                <Box style={{
                    float: 'right',
                    marginTop: '20px',
                    width: '100px'
                }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Limite</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={limit}
                            label="Limite"
                            onChange={(e) => setLimit(e.target.value)}
                        >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Fab 
                    sx={{
                        position: 'fixed',
                        right: '15px',
                        bottom: '15px'
                    }}
                    color="primary" aria-label="add" onClick={() => navigate('new/')}>
                    <AddIcon />
                </Fab>
            </Box>
}

export default TableList;