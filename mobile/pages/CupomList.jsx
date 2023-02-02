import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View, StatusBar } from "react-native";
import { Badge, List, useTheme } from "react-native-paper";
import { getCupom } from "../services/product";
import { getData } from "../services/storage";
import moment from 'moment';

const CupomList = ({ navigation }) => {
    const [cupons, setCupons] = useState([]);
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const [user, setUser] = useState(null);

    const init = async () => {
        let u = await getData('user', true);
        setUser(u);
        await loadData(u, page);
    }

    const detectScroll = async (e) => {
        let heightScroll = 100 * (page - 1);
        if(e.nativeEvent.contentOffset.y > heightScroll) {
            await loadData(user, page);
        }
    }

    const loadData = async (user, page, replace=false) => {
        let cups = await getCupom(user.store_id, page);
        if(cups.length == 0) return;
        setPage(page + 1);
        if(replace) {
            setCupons(cups);
        }else{
            setCupons((_v) => ([
                ..._v,
                ...cups
            ]));
        }
    }

    useEffect(() => {
        init();
    }, []);

    const viewCupom = (cupom) => {
        navigation.navigate('CupomItem', cupom)
    }

    return <View style={styles.container}>
        <List.Section style={{width: "100%"}}>
            <SafeAreaView style={styles.container_scroll}>
                <ScrollView 
                    onScroll={detectScroll}
                    style={styles.scrollView}>
                {
                cupons ? cupons?.map((cupom, idx) => {
                    return <List.Item 
                        key={idx}
                        onPress={() => viewCupom(cupom)}
                        title={moment(cupom.createdAt).format('DD/MM/YYYY HH:mm')}
                        left={() => <List.Icon icon="ticket-percent" />} 
                        right={() => <View styles={styles.rightButtons}>
                            <Badge style={{
                            backgroundColor: theme.colors.primary
                        }}>{
                            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cupom.total)
                        }</Badge></View>}
                    />
                }) : <Text>Nenhum cupons encontrado</Text>
            }
                </ScrollView>
            </SafeAreaView>
            </List.Section>
    </View>
}



const styles = StyleSheet.create({
    container_scroll: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        width: '100%'
    },
    scrollView: {
        height: 'calc(100vh - 100px)',
        marginHorizontal: 20,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'space-between',
      width: '100%'
    },
    rightButtons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  


export default CupomList;