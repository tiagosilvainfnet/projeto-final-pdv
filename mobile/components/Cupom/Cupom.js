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

const getTypePayment = (type) => {
    switch (type) {
        case 1:
            return 'Dinheiro';
        case 2:
            return 'PIX';
        case 3:
            return 'Débito';
        case 4:
            return 'Crédito';
        }
}

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
    title_price: {
        fontSize: 14,
    },
    text_price: {
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
        ...stylesPage.body,
        backgroundColor: 'transparent',
        maxWidth: '40%',
    },
    danfeTitle: {
        fontSize: stylesPage.danfeTitle.fontSize * zoom,
    },
    danfeSubTitle: {
        fontSize: stylesPage.danfeSubTitle.fontSize * zoom,
    },
    text: {
        fontSize: stylesPage.text.fontSize * zoom,
    },
    title_price: {
        fontSize: stylesPage.title_price.fontSize * zoom,
    },
    text_price: {
        fontSize: stylesPage.text_price.fontSize * zoom,
    },
});

const Cupom = ({ cupom }) => {
    const [products, setProducts] = useState([]);
    const [formas, setFormas] = useState([]);
    const [loja, setLoja] = useState({});
    
    const loadDatas = async () => {
        let cupomData = await getCupomData(cupom.id);
        setProducts(cupomData.products)
        setFormas(cupomData.formas)
        setLoja(cupomData.loja)
    }

    useEffect(() => {
        loadDatas();
    }, []);

    const printPdf = async () => {
        await printDoc(<CupomPdf 
            cupom={cupom} 
            styles={stylesPrint} 
            _print={true} 
            products={products}
            formas={formas}
            loja={loja}/>)
    }

    const sendPdfB64 = (b64) => {
        console.log(b64)
    }

    const save = async () => {
        await savePdf(<CupomPdf 
            cupom={cupom} 
            styles={stylesPrint} 
            _print={true}
            products={products}
            formas={formas}
            loja={loja}
        />, sendPdfB64);
    }

    return <>
        <View style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={{
                display: 'flex',
                maxWidth: '40%',
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
                <CupomPdf 
                cupom={cupom} 
                styles={stylesPage} 
                _print={false}
                products={products}
                formas={formas}
                loja={loja}
                />
            </View>
        </View>
    </>
}

const CupomPdf = ({ cupom, styles, _print, products, formas, loja}) => {
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
                                    _print ? <View style={{
                                        width: '50px',
                                        height: '50px',
                                        display: 'flex'
                                    }}>
                                        <Image src={logo_nfce} height={'50px'} width={'50px'} />
                                    </View> : <View style={{
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
                            }}><Text style={styles.text}>Cód.</Text></View>
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
                            <View style={styles.product_item}>
                                <View style={{
                                    display: 'flex',
                                    ...styles.productFirstItem,
                                    ...styles.productItem,
                                    ...styles.boxProduct,
                                    ...styles.width15,
                                }}><Text style={styles.text}>00001</Text></View>
                                <View  style={{
                                    display: 'flex',
                                    ...styles.productItem,
                                    ...styles.boxProduct,
                                    ...styles.width40,
                                }}><Text style={styles.text}>Produto 1</Text></View>
                                <View  style={{
                                    display: 'flex',
                                    ...styles.productItem,
                                    ...styles.boxProduct,
                                    ...styles.width15,
                                }}><Text style={styles.text}>1</Text></View>
                                <View  style={{
                                    display: 'flex',
                                    ...styles.productItem,
                                    ...styles.boxProduct,
                                    ...styles.width15,
                                }}><Text style={styles.text}>19,99</Text></View>
                                <View  style={{
                                    display: 'flex',
                                    ...styles.productItem,
                                    ...styles.boxProduct,
                                    ...styles.width15,
                                }}><Text style={styles.text}>19,99</Text></View>
                            </View>
                            {
                                products.length > 0 ? products.map((product, idx) => {
                                    let lastRow = products.length - 1 === idx;
                                    let localLastRow = {}
                                    if(lastRow){
                                        localLastRow = styles.productLastRow
                                    }
                                    let price = product.price;
                                    if(product.promo_price){
                                        price = product.promo_price;
                                    }

                                    return <View style={styles.product_item}>
                                                <View style={{
                                                    display: 'flex',
                                                    ...styles.productFirstItem,
                                                    ...styles.productItem,
                                                    ...styles.boxProduct,
                                                    ...styles.width15,
                                                    ...localLastRow
                                                }}><Text style={styles.text}>{product.id}</Text></View>
                                                <View  style={{
                                                    display: 'flex',
                                                    ...styles.productItem,
                                                    ...styles.boxProduct,
                                                    ...styles.width40,
                                                    ...localLastRow
                                                }}><Text style={styles.text}>{product.name}</Text></View>
                                                <View  style={{
                                                    display: 'flex',
                                                    ...styles.productItem,
                                                    ...styles.boxProduct,
                                                    ...styles.width15,
                                                    ...localLastRow
                                                }}><Text style={styles.text}>{product.quantity}</Text></View>
                                                <View  style={{
                                                    display: 'flex',
                                                    ...styles.productItem,
                                                    ...styles.boxProduct,
                                                    ...styles.width15,
                                                    ...localLastRow
                                                }}><Text style={styles.text}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}</Text></View>
                                                <View  style={{
                                                    display: 'flex',
                                                    ...styles.productItem,
                                                    ...styles.boxProduct,
                                                    ...styles.width15,
                                                    ...localLastRow
                                                }}><Text style={styles.text}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price * product.quantity)}</Text></View>
                                            </View>
                                }) : null
                            }
                        </View>
                        <View style={styles.pagamentos}>
                            <View style={styles.pagamento_box}>
                                <View>
                                    <Text style={styles.title_price}>QTD. TOTAL DE ITENS</Text>
                                </View>
                                <View>
                                    <Text style={styles.text_price}>{products.length}</Text>
                                </View>
                            </View>
                            <View style={styles.pagamento_box}>
                                <View>
                                    <Text style={styles.title_price}>VALOR TOTAL</Text>
                                </View>
                                <View>
                                    <Text style={styles.text_price}>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cupom.total)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.pagamento_box}>
                                <View>
                                    <Text style={styles.title_price}>
                                    VALOR PAGO
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.text_price}>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cupom.payed_value)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.pagamento_box}>
                                <View style={styles.title_price}>
                                    <Text style={styles.title_price}>
                                    TROCO
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.text_price}>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cupom.troco)}
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                ...styles.pagamento_box,
                                marginTop: 5
                            }}>
                                <View><Text style={styles.title_price}>FORMAS DE PAGAMENTO</Text></View>
                                <View><Text style={styles.title_price}>VALOR PAGO</Text></View>
                            </View>
                            {
                                formas.length > 0 ? formas.map((forma, idx) => {
                                    return <View style={styles.pagamento_box}>
                                        <View><Text style={styles.text_price}>{idx + 1} - {getTypePayment(forma.type)}</Text></View>
                                        <View><Text style={styles.text_price}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(forma.value)}</Text></View>
                                    </View>
                                }) : null
                            }
                        </View>
                        <View style={styles.cupom_id}>
                            <View style={styles.id_box}>
                                <View><Text style={styles.text_price}>Nº</Text></View>
                                <View><Text style={styles.text_price}>000{cupom.id}</Text></View>
                            </View>
                            <View style={styles.id_box}>
                                <View><Text style={styles.text_price}>Data emissão</Text></View>
                                <View><Text style={styles.text_price}>{moment(cupom.createdAt).format('DD/MM/YYYY HH:mm:ss')}</Text></View>
                            </View>
                        </View>
                        <View style={styles.qrcode}>  
                            {
                                _print ? <View style={{
                                    width:'94.5px',
                                    height: '94.5px',
                                    display: 'flex'
                                }}><Image src={qrcode_image_jpg} height={'auto'} width={'70%'} /></View> : <View style={{
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