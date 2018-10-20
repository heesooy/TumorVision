import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from './components/common';

class Result extends React.Component {
  static navigationOptions = {
    title: 'Result',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Card>
          <CardSection>
            <Text>Put some information, like Logo or something here</Text>
          </CardSection>
          <CardSection>
            <Button
              onPress={() =>
              navigate('Start', { name: 'Jane' })
              }
            >Return to start</Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default Result;
