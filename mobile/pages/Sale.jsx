import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ProductCart } from "../components";
import { storeData } from "../services/storage";

const Sale = ({
    route
}) => {
    const [cart, setCart] = useState(route.params);

    useEffect(() => {
        storeData('cart', cart, true);
    }, [cart]);

    return <View style={styles.container}>
                <View style={styles.left}></View>
                <View style={styles.right}>
                    <View>
                        {
                            cart ? <ProductCart cart={cart} setCart={setCart}/> : 'Nenhum produto encontrado'
                        }
                        
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
        width:'50%'
    },
    right: {
        padding: 10,
        width:'50%'
    }
  });

export default Sale;