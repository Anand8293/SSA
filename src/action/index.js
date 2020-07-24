import { AsyncStorage } from "react-native"

export const RESTORE_TOKEN = 'restore_token'
export const SIGN_IN = 'sign_in'
export const SIGN_OUT = 'sign_out'
export const CHANGE_MODE = 'change_mode'

export const didPressSignIn = async(dispatch, token = '') => {
   try {
        await AsyncStorage.setItem('userToken', token);
    } catch (e) {
        // Restoring token failed
    }
    dispatch({ type: SIGN_IN, token});
}

export const didPressLogout = async(dispatch) => {
    await AsyncStorage.setItem('userToken', "");
    await AsyncStorage.setItem('dealerDetails', "")
    dispatch({ type: SIGN_OUT })
}

export const didPressChnageMode =  mode => dispatch({ type: CHANGE_MODE, mode })

