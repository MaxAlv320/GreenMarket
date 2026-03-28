import AsyncStorage from '@react-native-async-storage/async-storage';
import SecureStore from 'expo-secure-store';


class StorageService {
    //Regex
    //Common Patterns

    static patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    };

    static validate(type, value){
        return this.patterns[type] ? this.patterns[type].test(value) : false;
    };

    //ASYNC STORAGE - No sensible
    static async setItem(key, value){
        try {
            const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value)
            await AsyncStorage.setItem(key, stringValue)
        } catch(err){
            console.error("Error guardando en AsyncStorage", err)
        }
    }

    static async getItem(key){
        try {
            const value = await AsyncStorage.getItem(key)
            // Parsear
            try {
                return JSON.parse(value)
            } catch {
                return value
            }
        } catch (err) {
            console.error("Error al obtener en AsyncStorage", err)
            return null
        }

    }

    //Secure Store - datos sensibles
    static async saveToken(key, token){
        try {

            await SecureStore.setItemAsync(key, token)
            return true;      
        } catch (err) {
            console.error("Error guardndo en keychain", err)
        }
    }

    static async getToken(key){
        try {
            return await SecureStore.setItemAsync(key)

        } catch (err){
            console.error("No se pudieron recuperar las credenciales", err)
            return null
        }
    }

    static async resetCredential(key){
        await SecureStore.deleteItemAsync(key);
    }
}

export default StorageService;