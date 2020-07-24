/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppNavigation from './src/navigation'
import AppProvider from './src/provider/AppProvider';

AppRegistry.registerComponent(appName, () => AppProvider);
