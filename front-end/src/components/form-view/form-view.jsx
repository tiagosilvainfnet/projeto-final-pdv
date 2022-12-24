import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { _patch, _post } from '../../services/request';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';


const FormView = ({ id, title, path, state, setState, store_id, categories, fields }) => {
    const navigate = useNavigate();
    const [snack, setSnack] = React.useState(false);
    const [messageSnack, setMessageSnack] = React.useState("");

    const toggleSnack = () => {
        setSnack(!snack);
    };
    
    const submit = async () => {
        let response;
        if(id){
            response = await _patch(path, id, state);
        }else{
            response = await _post(path, state);
        }
        toggleSnack();
        setMessageSnack(response.data.msg);

        if(response.data.status === 200){
            setTimeout(() => {
                navigate(`/${path}`);
            }, 5000);
        }
    }

    const handleChange = (e, length) => {
        let { name, value } = e.target;

        if(length){
            console.log(name)
            console.log('oi')
            value = value.length <=  length ? value : state[name]
        }

        setState((_v) => ({
            ..._v,
            [name]: value
        }))
    }


    return <Box>
    <Box style={{
        marginBottom: '32px'
    }}>
        <Typography component={'h1'} variant={'h4'}>{id ? 'Editar' : 'Criar'} {title}</Typography>
    </Box>
    <Box>
        <Grid container>
            {
                fields.map((field, idx) => {
                    if(Object.keys(state).includes(field.key)){
                        if(!field.hidden){
                            if(field.key !== "role_id" && field.key !== "category_id" ){
                                return <Grid key={idx} sx={{
                                    padding: "5px",
                                    boxSizing: "border-box"
                                }} xs={field.size.xs} sm={field.size.sm}>
                                            <TextField 
                                                value={state[field.key]}
                                                type={field.type} 
                                                fullWidth={true} 
                                                name={field.key}
                                                id="outlined-basic" 
                                                label={field.label} 
                                                onChange={(e) => handleChange(e, field.length)}
                                                variant="outlined" />
                                        </Grid>
                            }else if(field.key === 'category_id'){
                                return <Grid key={idx} sx={{
                                            padding: "5px",
                                            boxSizing: "border-box"
                                        }} xs={field.size.xs} sm={field.size.sm}>
                                        <FormControl  fullWidth>
                                            <InputLabel id="category-label">Categorias</InputLabel>
                                            <Select
                                                labelId="category-label"
                                                id="category"
                                                name={field.key}
                                                value={state.category_id}
                                                label="Categoria"
                                                onChange={handleChange}
                                            >
                                            { categories.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>) }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                            }
                        }
                    }
                })
            }
            <Grid sx={{
                        padding: "5px",
                        boxSizing: "border-box"
                    }} xs={12} sm={12}>
                <Button variant="contained" size="large" fullWidth={true} onClick={submit}>Enviar</Button>
            </Grid>
        </Grid>
    </Box>
    <Snackbar
        open={snack}
        autoHideDuration={4000}
        onClose={toggleSnack}
        message={messageSnack}
      />
</Box>
}

FormView.defaultProps = {
    categories: []
}

export default FormView;