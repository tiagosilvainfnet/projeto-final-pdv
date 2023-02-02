import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const CupomItem = ({
    route
}) => {
    const cupom = route.params;
    console.log(cupom)

    return <View style={styles.container}><Text>Cupom Item</Text></View>
}


const styles = StyleSheet.create({});

export default CupomItem;