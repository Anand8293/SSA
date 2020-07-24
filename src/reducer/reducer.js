import { UPDATEWEATHER } from "../action/Action";
import {weather} from '../utils/Constants'

const initialState = { cityWeather: weather}

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATEWEATHER:
            return {
                ...state,
                cityWeather: action.data
            };
        default:
            return state
    }
}