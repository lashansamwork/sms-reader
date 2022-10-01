/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { MD3DarkTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#c8a265',
      secondary: '#0c0d0c',
      onPrimary: '#0c0d0c',
      background: '#0c0d0c',
      surfaceDisabled: 'white',
      onSurfaceDisabled: 'white'
    },
}

export default function Main() {
    return (<SafeAreaProvider>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
      </SafeAreaProvider>);
  }
  
AppRegistry.registerComponent(appName, () => Main);