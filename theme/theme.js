import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

export default theme;