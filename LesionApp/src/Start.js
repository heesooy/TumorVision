import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from './components/common';

class Start extends React.Component {
  static navigationOptions = {
    title: 'Start',
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
              navigate('Fill', { name: 'Jane' })
              }
            >Next</Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default Start;
