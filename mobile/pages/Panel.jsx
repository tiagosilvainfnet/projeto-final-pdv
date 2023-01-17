import { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { Badge, IconButton, List, Searchbar, Text, useTheme } from 'react-native-paper';

const Panel = () => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return <View style={styles.container}>
                <View style={styles.left}>
                    <Searchbar
                        placeholder="Buscar produto..."
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                    <List.Section>
                        <List.Subheader>Produtos</List.Subheader>
                        <List.Item 
                            onPress={() => console.log('Pressed')}
                            title="First Item" 
                            left={() => <List.Icon icon="basket-outline" />} 
                            right={() => <View styles={styles.rightButtons}>
                                <Badge style={{
                                backgroundColor: theme.colors.primary
                            }}>R$ 19,99</Badge>
                            </View>}/>
                    </List.Section>
                </View>
                <View style={styles.right}></View>
    </View>
}


const styles = StyleSheet.create({
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