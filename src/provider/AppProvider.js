import React from 'react'
import AppNavigation from '../navigation';
import store from '../store';
import { Provider } from 'react-redux';


export default AppProvider = () => {

    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    );


}