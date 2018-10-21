import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Start from './src/Start.js';
import Fill from './src/Fill.js';
import Capture from './src/Capture.js';
import Result from './src/Result.js';

const RootStack = createStackNavigator({
  Start: { screen: Start },
  Fill: { screen: Fill },
  Capture: { screen: Capture },
  Result: { screen: Result }
},
{
  initialRouteName: 'Start',
  /* The header config from HomeScreen is now here */
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent: 'space-between',
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1
    },
  },
});

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

export default App;
