import React from 'react';
import { View, Text, Picker } from 'react-native';
import { Card, CardSection, Button } from './components/common';

class Fill extends React.Component {
  static navigationOptions = {
    title: 'Fill',
  };

  state = {
    age: 1,
    sex: 'male'
  };

  listAge = (max) => {
    let list = [];
    for (let i = 1; i <= max; i++) {
      list.push(i);
    }
    return (
      list.map((x, i) => {
          return (<Picker.Item label={x.toString()} key={i} value={i + 1} />);
        })
      );
  }

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
                selectedValue={this.state.age}
                onValueChange={(value) => this.setState({ age: value })}
              >
                {this.listAge(100)}
              </Picker>
            </Card>
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
