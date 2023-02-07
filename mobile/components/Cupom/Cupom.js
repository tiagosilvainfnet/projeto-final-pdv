import { Document, Page, Text, View, StyleSheet, Font, Image, pdf } from '@react-pdf/renderer';
import { Button } from "../";
import { printDoc, savePdf } from '../../services/print';
import {Image as _Image} from 'react-native';

Font.register({
    family: 'Roboto',
    fonts: [
        { 
            src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2' 
        },
        { 
            src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4.woff2', 
            fontWeight: 'bold' 
        },
    ],
})


const stylesPage = StyleSheet.create({
    body: {
        backgroundColor: '#fffb88'
    },
    topBar: {
        display: 'flex',
        flexDirection: 'column',
    },
    topbarTop: {
        display: 'flex',
        flexDirection: 'column',
    },
    topbarBottom: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    },
    marketInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    danfeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    danfeSubTitle: {
        fontSize: 14,
    },
    products: {
        display: 'flex',
        flexDirection: 'column',
    },
    product_header: {
        display: 'flex',
        flexDirection: 'row',
    },
    product_body: {
        display: 'flex',
        flexDirection: 'column',
    },
    product_item: {
        display: 'flex',
        flexDirection: 'row',
    },
});

const stylesPrint = StyleSheet.create({
    ...stylesPage,
    body: {
        backgroundColor: 'transparent'
    },
});

const Cupom = ({ cupom }) => {
    const printPdf = async () => {
        await printDoc(<CupomPdf cupom={cupom} styles={stylesPrint} print={true}/>)
    }

    const sendPdfB64 = (b64) => {
        console.log(b64)
    }

    const save = async () => {
        await savePdf(<CupomPdf cupom={cupom} styles={stylesPrint} print={true}/>, sendPdfB64);
    }

    return <>
        <Button
            label="Imprimir"
            onPress={async () => {
                printPdf();
            }}
            icon="print"
        />
        <Button
            label="Salvar"
            onPress={async () => {
                save();
            }}
            icon="print"
        />
        <CupomPdf cupom={cupom} styles={stylesPage} print={false}/>
    </>
}

const CupomPdf = ({ cupom, styles }) => {
    return <>
        <Document>
            <Page size="A4">
                <View style={styles.body}>
                    <View style={styles.topBar}>
                        <View style={styles.topbarTop}>
                            <View>
                                {/* {
                                    print ? <Image src={require('../../assets/images/nfce-logo.png')} height={'50px'}/> : <_Image source={require('../../assets/images/nfce-logo.png')} height={'50px'}/>
                                } */}
                            </View>
                            <View style={styles.marketInfo}>
                                <Text>MERCADO: Nome mercado</Text>
                                <Text>CNPJ: ...</Text>
                                <Text>Endereço: ...</Text>
                            </View>
                        </View>
                        <View style={styles.topbarBottom}>
                            <Text style={styles.danfeTitle}>DANFE NFC-e Documento Auxiliar da Nota Fiscal de Consumidor Eletrônico</Text>
                            <Text style={styles.danfeSubTitle}>NFC-e não permite aproveitamento de crédito de ICMS</Text>
                        </View>
                    </View>
                    <View style={styles.products}>
                        <View style={styles.product_header}>
                            <View>Código</View>
                            <View>Descrição</View>
                            <View>Qtde</View>
                            <View>Valor</View>
                            <View>Total</View>
                        </View>
                        <View style={styles.product_body}>
                            <View style={styles.product_item}>
                                <View>00001</View>
                                <View>Produto 1</View>
                                <View>1</View>
                                <View>19,99</View>
                                <View>19,99</View>
                            </View>
                            <View style={styles.product_item}>
                                <View>00002</View>
                                <View>Produto 2</View>
                                <View>2</View>
                                <View>10,00</View>
                                <View>20,00</View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    </>
}

export default Cupom;