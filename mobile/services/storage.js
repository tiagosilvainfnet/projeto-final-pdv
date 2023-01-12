import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData  = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
    // saving error
    }
}

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
          // value previously stored
        }
      } catch(e) {
        // error reading value
      }
}

export {
    storeData,
    getData
}