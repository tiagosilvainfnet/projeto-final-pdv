import { useState, useEffect } from "react";
import {  } from 'react-native';
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    StatusBar
  } from 'react-native';
import { Badge, List, Searchbar, Text, useTheme } from 'react-native-paper';
import { getProduct } from "../services/product";
import { getData, storeData } from "../services/storage";
import { Button, ProductCart } from "../components";
import lodash from 'lodash';

const Panel = ({ navigation }) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => {
        setPage(1);
        setSearchQuery(query);
        searchByNameOrEan(query, 1);
    } 
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(1);

    const init = async () => {
        let u = await getData('user', true);
        setUser(u);
        await loadData(u);
    }

    const detectScroll = async (e) => {
        let heightScroll = 100 * (page - 1);
        if(e.nativeEvent.contentOffset.y > heightScroll) {
            await loadData(user, null, page);
        }
    }

    const addToCart = (product) => {
        let idx = cart.findIndex((item) => item.id == product.id);
        let c = null;
        if(idx === -1){
            setCart((_v) => ([
                ..._v, 
                {
                    ...product,
                    quantity: 1
                }
            ]));
        }else{
            c = cart;
            c[idx].quantity = c[idx].quantity + 1;
            setCart((_v) => ([...c]));
        }
    }

    const loadCart = async () => {
        const cart = await getData('cart', true);
        setCart((_v) => ([...cart]));
    }
        

    useEffect(() => {
        setInterval(() => {
            loadCart();
        }, 3000);
    }, []);

    useEffect(() => {
        storeData('cart', cart, true);
    }, [cart]);

    const loadData = async (user, search, page, replace=false) => {
        let prods = await getProduct(user.store_id, page, search);
        if(prods.length == 0) return;
        setPage(page + 1);
        if(replace) {
            setProducts(prods);
        }else{
            setProducts((_v) => ([
                ..._v,
                ...prods
            ]));
        }
    }

    const searchByNameOrEan = async (search, page) => {
        await loadData(user, search, page, true);
    }
    
    useEffect(() => {
        init();
    }, []);

    return <View style={styles.container}>
                <View style={styles.left}>
                    <Searchbar
                        placeholder="Buscar produto..."
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                    <List.Section>
                        <List.Subheader>Produtos</List.Subheader>
                        <SafeAreaView style={styles.container_scroll}>
                            <ScrollView 
                                onScroll={detectScroll}
                                style={styles.scrollView}>
                            {
                            products ? products?.map((product, idx) => {
                                return <List.Item 
                                    key={idx}
                                    onPress={() => addToCart(product)}
                                    title={product.name}
                                    left={() => <List.Icon icon="basket-outline" />} 
                                    right={() => <View styles={styles.rightButtons}>
                                        <Badge style={{
                                        backgroundColor: theme.colors.primary
                                    }}>{
                                        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promo_price != 0 && product.promo_price != null ? product.promo_price : product.price)
                                    }</Badge>
                                </View>}/>
                            }) : <Text>Nenhum produto encontrado</Text>
                        }
                            </ScrollView>
                        </SafeAreaView>
                    </List.Section>
                </View>
                <View style={styles.right}>
                    <View>
                        <ProductCart cart={cart} setCart={setCart}/>
                    </View>
                    <View style={{
                        marginTop: '2em'
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: '.5em'
                        }}>
                            <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: '2em'
                            }}>Valor total</Text>
                            <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: '2em'
                            }}>{
                                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lodash.sumBy(cart.map(c => {
                                    return {
                                        ...c,
                                        price: c.promo_price != 0 && c.promo_price != null ?  parseFloat(c.promo_price) * parseInt(c.quantity) : parseFloat(c.price) * parseInt(c.quantity)
                                    }
                                }), "price"))
                            }
                            </Text>
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
                                onPress={() => {
                                    navigation.navigate('Sale', cart)
                                }} label="Finalizar compra"/>
                        </View>
                        <View style={{
                            marginTop: '2em',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Button 
                                style={{...styles.button, width: '100%'}} mode="contained" onPress={() => {
                                    navigation.navigate('CupomList')
                                }} label="Cupons"/>
                        </View>
                    </View>
                </View>
    </View>
}


const styles = StyleSheet.create({
    container_scroll: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    scrollView: {
        height: 'calc(100vh - 200px)',
        marginHorizontal: 20,
    },
    button: {
        borderRadius: 0,
        padding: 5,
        width: '49%'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'space-between',
    },
    rightButtons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    left: {
        padding: 10,
        width:'50%'
    },
    right: {
        padding: 10,
        width:'50%'
    }
  });
  

export default Panel;