import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from './components/common';

class Fill extends React.Component {
  static navigationOptions = {
    title: 'Fill',
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
              navigate('Capture', { name: 'Jane' })
              }
            >Next</Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default Fill;
