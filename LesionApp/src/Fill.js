import React from 'react';
import { View, Text, Picker } from 'react-native';
import { Card, CardSection, Button } from './components/common';

class Fill extends React.Component {
  static navigationOptions = {
    title: 'Fill',
  };

  state = {
    age: null,
    sex: 'male'
  };

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Text>Please fill out your age and sex.</Text>
          </CardSection>

          <CardSection>
            <Card>
              <Picker
                style={{ width: 300 }}
                selectedValue={this.state.sex}
                onValueChange={(value) => this.setState({ sex: value })}
              >
                <Picker.Item label='Male' value='male' />
                <Picker.Item label='Female' value='female' />
              </Picker>
            </Card>
          </CardSection>

          <CardSection>
            <Button
              onPress={() =>
                this.props.navigation.navigate('Capture', {
                  age: this.state.age,
                  sex: this.state.sex
                })
              }
            >
              Next
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default Fill;
