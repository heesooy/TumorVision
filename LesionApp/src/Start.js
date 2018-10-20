import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from './components/common';

class Start extends React.Component {
  static navigationOptions = {
    title: 'Start',
  };

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Text>Put some information, like Logo or something here</Text>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.props.navigation.navigate('Fill')}>
              Next
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default Start;
