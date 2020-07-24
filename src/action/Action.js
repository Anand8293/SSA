export const UPDATEWEATHER = 'update_weather'

export function doUpdate(data){
    return{
        type : UPDATEWEATHER,
        data
    }
}