import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { login, userIsLoggedIn } from '../../services/auth';
import logo from '../../assets/img/logo.png';
import { useEffect } from 'react';

const Login = ({ setCurrentRoute }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        userIsLoggedIn(navigate, location.pathname)
        setCurrentRoute(location.pathname);
    }, [])
    
    return <Grid container spacing={2}>
            <Grid item xs={0} sm={4}></Grid>
            <Grid item xs={12} sm={4}>
                <Stack direction={'column'}>
                    <Box sx={{
                        textAlign: 'center',
                        padding: '20px',
                        boxSizing: 'border-box'
                    }}>
                        <img
                            src={logo}
                            style={{
                                borderRadius: '100%',
                                height: '100px',
                                marginBottom: '14px'
                            }}
                        />
                        <Typography variant="h5" gutterBottom>LOGIN</Typography>
                    </Box>

                    <TextField
                        fullWidth={true}
                        label={'E-mail'}
                        type={'email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            marginBottom: '8px'
                        }}
                    />
                    <TextField
                        fullWidth={true}
                        label={'Senha'}
                        type={'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            marginBottom: '8px'
                        }}
                    />
                    <Button
                        size='large'
                        variant='contained'
                        onClick={async () => {
                            try{
                                const response = await login(email, password);
                                if(response.status === 200){
                                    console.log(response.data)
                                    window.localStorage.setItem('user', JSON.stringify(response.data));
                                    navigate('/')
                                }else{
                                    alert("Erro ao realizar login")
                                }
                            }catch(err){
                                alert("Erro ao realizar login")
                            }

                            
                        }}
                    >Entrar</Button>
                </Stack>
            </Grid>
            
        </Grid>
}

export default Login;