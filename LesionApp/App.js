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
});

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

export default App;
