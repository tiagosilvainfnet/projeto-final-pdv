import { useState, useEffect } from "react";
import { View } from "react-native";
import { StyleSheet } from 'react-native';
import { Avatar } from "react-native-paper";
import { TextField, Button } from "../components";
import { storeData } from "../services/storage";
import { login, verifyUserIsLoggedIn } from "../services/auth";
import { createTables } from "../services/persist";

const Login = ({ navigation, route }) => {
    const [email, setEmail] = useState('tiagoluizribeirodasilva@gmail.com');
    const [password, setPassword] = useState('123');
    
    const init = async () => {
        const userIsLoggedIn = await verifyUserIsLoggedIn();
        if(userIsLoggedIn){
            navigation.navigate('Panel');
        }
    }

    useEffect(() => {
        init()
    }, []);


    return <View style={styles.container}>
        <View style={styles.containerBg}></View>
        <View style={styles.bodyLogin}>
            <View style={styles.containerInput}>
                <Avatar.Image 
                    size={150}
                    source={require('../assets/images/logo.png')}
                />
            </View>
            <View style={styles.containerInput}>
                <TextField
                    style={styles.input}
                    mode="flat"
                    label="E-mail"
                    iconLeft="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={styles.containerInput}>
                <TextField
                    style={styles.input}
                    mode="flat"
                    label="Senha"
                    iconLeft="lock"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <Button 
                style={styles.button}
                label="Entrar"
                onPress={async () => {
                    try{
                        const response = await login(email, password);
                        console.log(response)
                        if(response.status === 200){
                            navigation.navigate('Panel');
                            await storeData('user', response.data, true);
                            await createTables();
                        }else{
                            alert('Usuário ou senha inválidos');
                        }
                    }catch(e){
                        console.log(e)
                        alert('Usuário ou senha inválidos');
                    }
                }}
                icon="login"
            />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: '100%',
    },
    containerBg:{
        opacity: 0.2,
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundSize: "cover",
        backgroundImage: "url('https://www.itpindustrial.com.br/media/user/images/original/loja-de-blog-c3.jpg')",
    },
    bodyLogin: {
        display: "flex",
        width: "40%",
    },
    containerInput:{
        display: "flex",
        alignItems: "center",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        width: "100%",
    },
    button: {
        borderRadius: 0,
        padding: 5,
    }
  });
  

export default Login;