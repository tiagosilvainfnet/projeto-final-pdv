import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Dimensions
  } from 'react-native';
import { Badge, List, Text, useTheme } from 'react-native-paper';
import "intl";
import "intl/locale-data/jsonp/en";

const styles = StyleSheet.create({
    container_scroll: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    scrollView: {
        height: Dimensions.get('window').height - 200,
        marginHorizontal: 20,
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
    }
  });

const ProductCart = ({ cart, setCart }) => {
    const theme = useTheme();

    const removeToCard = (id) => {
        let c = cart;
        let idx = cart.findIndex((item) => item.id == id);
        c.splice(idx, 1);
        setCart((_v) => ([...c]));
    }

    return <View style={{
        ...styles.scrollView,
        height: Dimensions.get('window').height * 0.6,
    }}>
    <SafeAreaView style={styles.container_scroll}>
        <ScrollView>
            {
            cart.length > 0 ? cart?.map((item, idx) => {
                return <List.Item 
                    key={idx}
                    onPress={() => removeToCard(item.id)}
                    title={item.name}
                    left={() => <List.Icon icon="basket-outline" />} 
                    right={() => <View styles={styles.rightButtons}>
                        <Badge style={{
                        backgroundColor: theme.colors.primary
                    }}>{
                        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.promo_price != 0 && item.promo_price != null ? parseFloat(item.promo_price) * parseInt(item.quantity) : parseFloat(item.price) * parseInt(item.quantity))
                    }</Badge>
                </View>}/>
            }) : <Text>Nenhum produto encontrado</Text>
    }
        </ScrollView>
</SafeAreaView>
</View>
}
export default ProductCart;