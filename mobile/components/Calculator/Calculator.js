import { StyleSheet, Text, View } from "react-native"
import { Button, TextField } from "..";

const paymentType = [
    {
        type: 1,
        name: "Dinheiro",
    },
    {
        type: 2,
        name: "Pix",
    },
    {
        type: 3,
        name: "Débito",
    },
    {
        type: 4,
        name: "Crédito",
    }
]

const Calculator = ({ value, setValue, payments, setPayments }) => {
    const addValue = (v) => {
        if(value === "0,00"){
            setValue(v)
        }else{
            setValue(value + v)
        }
    }

    const clearValue = () => {
        setValue("0,00")
    }

    const addPayment = (type) => {
        let verifyPType = payments.findIndex(item => item.type === type);

        if(verifyPType > -1){
            let pags = payments;
            pags[verifyPType].value += parseFloat(value.replace(",", "."));
            setPayments(pags);
        }else{
            const pTypeIdx = paymentType.findIndex(item => item.type === type);
            setPayments([...payments, {type: paymentType[pTypeIdx].type, value: parseFloat(value.replace(",", ".")), name: paymentType[pTypeIdx].name}])
        }

        clearValue();
    }

    return <View style={styles.container}>
        <View style={styles.containerCalculator}>
            <View style={styles.containerTextField}>
                <TextField 
                    value={value}
                />
            </View>
            <View style={styles.containerBtn}>
                <View style={styles.rowBtn}>
                    <View style={styles.paddingBtn}><Button onPress={() => addValue('7')} style={styles.btnCalculator} label={'7'}/></View>
                    <View style={styles.paddingBtn}><Button onPress={() => addValue('8')} style={styles.btnCalculator} label={'8'}/></View>
                    <View style={styles.paddingBtn}><Button onPress={() => addValue('9')} style={styles.btnCalculator} label={'9'}/></View>
                </View>
                <View style={styles.rowBtn}>
                    <View style={styles.paddingBtn}><Button onPress={() => addValue('4')} style={styles.btnCalculator} label={'4'}/></View>
                    <View style={styles.paddingBtn}><Button onPress={() => addValue('5')} style={styles.btnCalculator} label={'5'}/></View>
                    <View style={styles.paddingBtn}><Button onPress={() => addValue('6')} style={styles.btnCalculator} label={'6'}/></View>
                </View>
                <View style={styles.rowBtn}>
                    <View style={styles.paddingBtn}><Button onPress={() => addValue('1')} style={styles.btnCalculator} label={'1'}/></View>
                    <View style={styles.paddingBtn}><Button onPress={() => addValue('2')} style={styles.btnCalculator} label={'2'}/></View>
                    <View style={styles.paddingBtn}><Button onPress={() => addValue('3')} style={styles.btnCalculator} label={'3'}/></View>
                </View>
                <View style={styles.rowBtn}>
                    <View style={styles.paddingBtn}><Button onPress={() => addValue('0')} style={styles.btnCalculator} label={'0'}/></View>
                    <View style={styles.paddingBtn}><Button onPress={() => addValue(',')} style={styles.btnCalculator} label={','}/></View>
                    <View style={styles.paddingBtn}><Button onPress={clearValue} style={styles.btnCalculator} label={'C'} value={'C'}/></View>
                </View>
            </View>
        </View>
        <View style={styles.containerButtons}>
            {paymentType.map((item, idx) => <View key={idx}><Button onPress={() => addPayment(item.type)} style={styles.button} label={item.name}/></View>)}
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerCalculator:{
        flexGrow: 2,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: '10%',
        paddingRight: '5%',
    },
    containerButtons: {
        flexGrow: 1,
        minHeight: '35%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight: '10%',
    },
    containerBtn: {
        display: 'flex',
        flexDirection: 'column',
    },
    rowBtn : {
        display: 'flex',
        flexDirection: 'row',
    },
    containerTextField:{
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
    },
    paddingBtn: {
        padding: '2.5%',
        width: '33%',
    },
    btnCalculator: {
        borderRadius: 0,
        width: '100%',
    },
    button:{
        borderRadius: 0
    }
});

export default Calculator;