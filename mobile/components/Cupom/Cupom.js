import { Document, Page, Text, View, StyleSheet, Font, Image, pdf } from '@react-pdf/renderer';
import { Button } from "../";
import { printDoc, savePdf } from '../../services/print';
import moment from 'moment';
import qrcode_image_png from '../../assets/images/qrcode.png';
import qrcode_image_jpg from '../../assets/images/qrcode.jpg';
import logo_nfce from '../../assets/images/logo-nfce.png';
import { useEffect, useState  } from 'react';
import { getCupomData } from '../../services/product';

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

const zoom = 0.5;


const stylesPage = StyleSheet.create({
    page: {
    },
    body: {
        backgroundColor: '#fffb88',
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    productFirstItem: {
        borderLeft: '1px dashed #000',
    },
    productLastRow: {
        borderBottom: '1px dashed #000',
    },
    productItem: {
        borderTop: '1px dashed #000',
        borderRight: '1px dashed #000'
    },
    topBar: {
        display: 'flex',
        flexDirection: 'column',
    },
    boxProduct: {
        boxSizing: 'border-box',
        padding: 5
    },
    width15:{
        width: '15%'
    },
    width40: {
        width: '40%'
    },
    topbarTop: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
        borderBottom: '1px dashed #333',
        paddingBottom: 20,
    },
    topbarBottom: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        marginBottom: 20,
        borderBottom: '1px dashed #333',
        paddingBottom: 20,
    },
    marketInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    text: {
        fontSize: 14,
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
    pagamentos: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        borderBottom: '1px dashed #333',
        paddingBottom: 20,
        marginBottom: 5,
    },
    pagamento_box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2.5,
        boxSizing: 'border-box',
    },
    cupom_id: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 5,
        marginBottom: 20,
        borderBottom: '1px dashed #333',
        paddingBottom: 10,
        marginBottom: 5,
    },
    id_box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 2.5,
        paddingRight: 2.5,
        boxSizing: 'border-box',
    },
    qrcode:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    }
});

const stylesPrint = StyleSheet.create({
    ...stylesPage,
    body: {
        backgroundColor: 'transparent'
    },
    danfeTitle: {
        fontSize: stylesPage.danfeTitle.fontSize * zoom,
    },
    danfeSubTitle: {
        fontSize: stylesPage.danfeSubTitle.fontSize * zoom,
    },
    text: {
        fontSize: stylesPage.text.fontSize * zoom,
    }
});

const Cupom = ({ cupom }) => {
    const printPdf = async () => {
        await printDoc(<CupomPdf cupom={cupom} styles={stylesPrint} _print={true}/>)
    }

    const sendPdfB64 = (b64) => {
        console.log(b64)
    }

    const save = async () => {
        await savePdf(<CupomPdf cupom={cupom} styles={stylesPrint} _print={true}/>, sendPdfB64);
    }

    return <>
        <View style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={{
                display: 'flex',
                maxWidth: '30%',
                flexDirection: 'column',
            }}>
                <Button
                    label="Imprimir"
                    onPress={async () => {
                        printPdf();
                    }}
                    style={{
                        width: '100%',
                        marginTop: 10,
                        marginBottom: 10
                    }}
                    icon="printer"
                />
                <CupomPdf cupom={cupom} styles={stylesPage} _print={false}/>
            </View>
        </View>
    </>
}

const CupomPdf = ({ cupom, styles, _print }) => {
    
    const [products, setProducts] = useState([]);
    const [formas, setFormas] = useState([]);
    const [loja, setLoja] = useState({});
    
    cupom = {"id":1,"total":"99.9000","payed_value":"150.0000","troco":"50.1000","store_id":1,"employee_id":11,"createdAt":"2022-12-21T23:54:31.000Z","updatedAt":"2023-02-02T22:52:57.000Z"}

    const loadDatas = async () => {
        let cupomData = await getCupomData(cupom.id);
        setProducts(cupomData.products)
        setFormas(cupomData.formas)
        setLoja(cupomData.loja)
    }


    useEffect(() => {
        loadDatas();
    }, []);

    return <>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.body}>
                    <View style={styles.topBar}>
                        <View style={styles.topbarTop}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: 5
                            }}>
                                <Text style={{
                                    ...styles.text,
                                    textAlign: 'center'
                                }}>MERCADO: Nome mercado</Text>
                            </View>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <View>
                                    {
                                    _print ? <Image src={logo_nfce} height={'50px'} width={'50px'} /> : <View style={{
                                        width: '50px',
                                        height: '50px',
                                        backgroundImage: `url(${logo_nfce})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        display: 'flex'
                                    }}></View>
                                }
                                </View>
                                <View style={{
                                    ...styles.marketInfo,
                                    marginLeft: 5
                                }}>
                                    <Text style={styles.text}>CNPJ: ...</Text>
                                    <Text style={styles.text}>Endereço: ...</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.topbarBottom}>
                            <Text style={styles.danfeTitle}>DANFE NFC-e Documento Auxiliar da Nota Fiscal de Consumidor Eletrônico</Text>
                            <Text style={styles.danfeSubTitle}>NFC-e não permite aproveitamento de crédito de ICMS</Text>
                        </View>
                    </View>
                    <View style={styles.products}>
                        <View style={styles.product_header}>
                            <View style={{
                                display: 'flex',
                                ...styles.productFirstItem,
                                ...styles.productItem,
                                ...styles.boxProduct,
                                ...styles.width15
                            }}><Text style={styles.text}>Código</Text></View>
                            <View style={{
                                display: 'flex',
                                ...styles.productItem,
                                ...styles.boxProduct,
                                ...styles.width40
                            }}><Text style={styles.text}>Descrição</Text></View>
                            <View  style={{
                                display: 'flex',
                                ...styles.productItem,
                                ...styles.boxProduct,
                                ...styles.width15
                            }}><Text style={styles.text}>Qtde</Text></View>
                            <View  style={{
                                display: 'flex',
                                ...styles.productItem,
                                ...styles.boxProduct,
                                ...styles.width15
                            }}><Text style={styles.text}>Valor</Text></View>
                            <View  style={{
                                display: 'flex',
                                ...styles.productItem,
                                ...styles.boxProduct,
                                ...styles.width15
                            }}><Text style={styles.text}>Total</Text></View>
                        </View>
                        <View style={styles.product_body}>
                            {
                                products.length > 0 ? products.map((product, idx) => {
                                    let lastRow = products.length - 1 === idx;
                                    let localLastRow = {}
                                    if(lastRow){
                                        localLastRow = styles.productLastRow
                                    }

                                    return <View style={styles.product_item}>
                                                <View style={{
                                                    display: 'flex',
                                                    ...styles.productFirstItem,
                                                    ...styles.productItem,
                                                    ...styles.boxProduct,
                                                    ...styles.width15,
                                                    ...localLastRow
                                                }}><Text style={styles.text}>00001</Text></View>
                                                <View  style={{
                                                    display: 'flex',
                                                    ...styles.productItem,
                                                    ...styles.boxProduct,
                                                    ...styles.width40,
                                                    ...localLastRow
                                                }}><Text style={styles.text}>Produto 1</Text></View>
                                                <View  style={{
                                                    display: 'flex',
                                                    ...styles.productItem,
                                                    ...styles.boxProduct,
                                                    ...styles.width15,
                                                    ...localLastRow
                                                }}><Text style={styles.text}>1</Text></View>
                                                <View  style={{
                                                    display: 'flex',
                                                    ...styles.productItem,
                                                    ...styles.boxProduct,
                                                    ...styles.width15,
                                                    ...localLastRow
                                                }}><Text style={styles.text}>19,99</Text></View>
                                                <View  style={{
                                                    display: 'flex',
                                                    ...styles.productItem,
                                                    ...styles.boxProduct,
                                                    ...styles.width15,
                                                    ...localLastRow
                                                }}><Text style={styles.text}>19,99</Text></View>
                                            </View>
                                }) : null
                            }
                        </View>
                        <View style={styles.pagamentos}>
                            <View style={styles.pagamento_box}>
                                <View>QTD. TOTAL DE ITENS</View>
                                <View>{products.length}</View>
                            </View>
                            <View style={styles.pagamento_box}>
                                <View>VALOR TOTAL</View>
                                <View>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cupom.total)}</View>
                            </View>
                            <View style={styles.pagamento_box}>
                                <View>VALOR PAGO</View>
                                <View>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cupom.payed_value)}</View>
                            </View>
                            <View style={styles.pagamento_box}>
                                <View>TROCO</View>
                                <View>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cupom.troco)}</View>
                            </View>
                            <View style={{
                                ...styles.pagamento_box,
                                marginTop: 5
                            }}>
                                <View>FORMAS DE PAGAMENTO</View>
                                <View>VALOR PAGO</View>
                            </View>
                            {
                                formas.length > 0 ? formas.map((forma, idx) => {
                                    return <View style={styles.pagamento_box}>
                                        <View>{idx + 1} - Dinheiro</View>
                                        <View>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cupom.troco)}</View>
                                    </View>
                                }) : null
                            }
                        </View>
                        <View style={styles.cupom_id}>
                            <View style={styles.id_box}>
                                <View>Nº</View>
                                <View>000{cupom.id}</View>
                            </View>
                            <View style={styles.id_box}>
                                <View>Data emissão</View>
                                <View>{moment(cupom.createdAt).format('DD/MM/YYYY HH:mm:ss')}</View>
                            </View>
                        </View>
                        <View style={styles.qrcode}>  
                            {
                                _print ? <Image src={qrcode_image_jpg} height={'auto'} width={'70%'} /> : <View style={{
                                    width: '200px',
                                    height: '200px',
                                    backgroundImage: `url(${qrcode_image_png})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                }}></View>
                            }
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    </>
}

export default Cupom;