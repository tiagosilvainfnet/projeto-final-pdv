import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { Button, Calculator, ProductCart } from "../components";
import { storeData } from "../services/storage";

const Sale = ({
    route
}) => {
    const [cart, setCart] = useState(route.params || []);
    const [value, setValue] = useState("0,00");
    const [troco, setTroco] = useState(0.00);
    const [total, setTotal] = useState(0.00);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        storeData('cart', cart, true);

        let tot = cart.reduce((acc, curr) => {
            let price = curr.promo_price != 0 && curr.promo_price != null ? curr.promo_price : curr.price;
            return acc + (price * curr.quantity);
        }, 0);
        setTotal(tot);
    }, [cart]);

    useEffect(() => {
        let troco = payments.reduce((acc, curr) => {
            return acc + curr.value;
        }, 0) - total;
        setTroco(troco);
    }, [payments]);
    

    return <View style={styles.container}>
                <View style={styles.left}>
                    <Calculator value={value} setValue={setValue} payments={payments} setPayments={setPayments}/>
                </View>
                <View style={styles.right}>
                    <View>
                        {
                            cart ? <ProductCart cart={cart} setCart={setCart}/> : 'Nenhum produto encontrado'
                        }
                        
                    </View>
                    <View>
                        {
                            // TODO: Remover pagamento
                            // TODO: Ícone por tipo de pagamento
                            payments.length > 0 ? payments.map((payment, idx) => {
                                return <List.Item
                                            onPress={() => {console.log('Remover pagamento')}}
                                            key={idx}
                                            title={payment.name}
                                            left={props => <List.Icon {...props} icon="folder" />}
                                            right={props => <Text>{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.value)}</Text>}
                                        />
                            }) : null
                        }

                        <List.Item
                            title="Troco"
                            left={props => <List.Icon {...props} icon="folder" />}
                            right={props => <Text>{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(troco)}</Text>}
                        />
                        <List.Item
                            title="Total"
                            left={props => <List.Icon {...props} icon="folder" />}
                            right={props => <Text>{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</Text>}
                        />
                    </View>
                    <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Button
                                disabled={cart.length == 0}
                                style={{...styles.button}} mode="contained" onPress={() => {
                                setCart((_v) => ([]));
                                storeData('cart', [], true);
                            }} label="Cancelar"/>
                            <Button
                                disabled={cart.length == 0} 
                                style={{...styles.button}} 
                                mode="contained" 
                                onPress={() => {}} label="Finalizar compra"/>
                        </View>
                </View>
            </View>
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'space-between',
    },
    left: {
        padding: 10,
        height: '100%',
        width:'50%'
    },
    right: {
        padding: 10,
        width:'50%'
    },
    button: {
        borderRadius: 0,
        padding: 5,
        width: '49%'
    },
  });

export default Sale;