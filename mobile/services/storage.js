import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData  = async (key, value, parse=false) => {
    try {
      let jsonValue;
      if(parse){
        jsonValue = JSON.stringify(value)
      }else{
        jsonValue = value
      }
        
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
    // saving error
    }
}

const getData = async (key) => {
  try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null && value !== undefined) {
        return value;
      }
    } catch(e) {
      // error reading value
    }
}

const clearData = async (keys) => {
  try {
    await AsyncStorage.clear();
  } catch(e) {
    // error reading value
  }
}

export {
    storeData,
    getData,
    clearData
}