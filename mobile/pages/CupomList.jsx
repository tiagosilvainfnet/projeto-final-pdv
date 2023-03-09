import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View, StatusBar, Dimensions } from "react-native";
import { Badge, List, useTheme } from "react-native-paper";
import { getCupom } from "../services/product";
import { getData } from "../services/storage";
import moment from 'moment';
import { printToFileAsync, printAsync } from "expo-print";
import { shareAsync } from 'expo-sharing';
import { generateHTMLDoc } from "../services/react-pdf-expo";
import { CupomPdf } from "../components";
import "intl";
import "intl/locale-data/jsonp/en";

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

    const viewCupom = async (cupom) => {
        const cupomPdf = CupomPdf({
            cupom: {
              id: 1,
              data: '2023-03-03',
              total: 9.99,
              payed_value: 9.99,
              troco: 0.00,
            },
            products: [],
            formas: [],
            loja: [],
          });
        const rcphtml = generateHTMLDoc(cupomPdf);
        // console.log(rcphtml);
        const { uri } = await printToFileAsync({ html: rcphtml });
        // // console.log("File has been saved to:", uri);
        // await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
        await printAsync(
            {
                uri,
            },
            {
                printerUrl: "printer:/local",
                dialogTitle: "Print Document",
                numberOfCopies: 1,
                orientation: "portrait",
                usePrinter: true
            }
        );
    }

    return <View style={styles.container}>
        <List.Section style={{width: Dimensions.get('window').width}}>
            <SafeAreaView style={styles.container_scroll}>
                <ScrollView 
                    onScroll={detectScroll}
                    style={styles.scrollView}>
                {
                cupons ? cupons?.map((cupom, idx) => {
                    return <List.Item 
                        key={idx}
                        onPress={async () => await viewCupom(cupom)}
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
        width: Dimensions.get('window').width
    },
    scrollView: {
        height: Dimensions.get('window').height - 120,
        marginHorizontal: 20,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'space-between',
      width: Dimensions.get('window').width
    },
    rightButtons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  


export default CupomList;