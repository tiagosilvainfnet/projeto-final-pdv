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

const getData = async (key, parse=false) => {
  try {
      let value = await AsyncStorage.getItem(key)
      if(value !== null && value !== undefined) {
        if(parse){
          value = JSON.parse(value)
        }
      }
      return value
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