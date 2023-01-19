import { useState, useEffect } from "react";
import {  } from 'react-native';
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    StatusBar
  } from 'react-native';
import { Badge, IconButton, List, Searchbar, Text, useTheme } from 'react-native-paper';
import { getProduct } from "../services/product";
import { getData } from "../services/storage";

const Panel = () => {
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
        if(idx === -1){
            setCart((_v) => ([
                ..._v, 
                {
                    ...product,
                    quantity: 1
                }
            ]));
        }else{
            let c = cart;
            c[idx].quantity = c[idx].quantity + 1;
            setCart(c);
        }
        
    }

    const removeToCard = (id) => {
        let c = cart;
        let idx = cart.findIndex((item) => item.id == id);
        c.splice(idx, 1);
        setCart(c);
    }

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
                                        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promo_price ? product.promo_price : product.price)
                                    }</Badge>
                                </View>}/>
                            }) : <Text>Nenhum produto encontrado</Text>
                        }
                            </ScrollView>
                        </SafeAreaView>
                    </List.Section>
                </View>
                <View style={styles.right}>
                    <SafeAreaView style={styles.container_scroll}>
                            <ScrollView 
                                onScroll={detectScroll}
                                style={{
                                    height: '200px',
                                    marginHorizontal: 20,
                                }}>
                                {
                                cart ? cart?.map((item, idx) => {
                                    return <List.Item 
                                        key={idx}
                                        onPress={() => addToCart(item)}
                                        title={item.name}
                                        left={() => <List.Icon icon="basket-outline" />} 
                                        right={() => <View styles={styles.rightButtons}>
                                            <Badge style={{
                                            backgroundColor: theme.colors.primary
                                        }}>{
                                            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.promo_price ? item.promo_price * item.quantity : item.price * item.quantity)
                                        }</Badge>
                                    </View>}/>
                                }) : <Text>Nenhum produto encontrado</Text>
                        }
                            </ScrollView>
                        </SafeAreaView>
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