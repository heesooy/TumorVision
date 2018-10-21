import React from 'react';
import { View, Text, Picker } from 'react-native';
import { Card, CardSection, Button } from './components/common';

class Fill extends React.Component {
  static navigationOptions = {
    title: 'Input Parameters',
    headerRight: (<View />)
  };

  state = {
    age: 1,
    sex: 'male'
  };

  listAge = (max) => {
    const list = [];
    for (let i = 1; i <= max; i++) {
      list.push(i);
    }
    return (
      list.map((x, i) => (<Picker.Item label={x.toString()} key={i}value={i + 1} />))
    );
  }

  render() {
    const {
      mainWrapperStyle,
      mainContentStyle,
      footerStyle
    } = styles;

    return (
      <View style={mainWrapperStyle}>
        <View style={mainContentStyle}>
          <CardSection>
            <Text>Please fill out your age and sex.</Text>
          </CardSection>

          <View style={{ borderWidth: 1, borderColor: '#808080', marginTop: 20, borderRadius: 10 }}>
            <Picker
              mode='dropdown'
              style={{ width: 300 }}
              selectedValue={this.state.age}
              onValueChange={(value) => this.setState({ age: value })}
            >
              {this.listAge(100)}
            </Picker>
          </View>
          <View style={{ borderWidth: 1, borderColor: '#808080', marginTop: 20, borderRadius: 10 }}>
            <Picker
              mode='dropdown'
              style={{ width: 300 }}
              selectedValue={this.state.sex}
              onValueChange={(value) => this.setState({ sex: value })}
            >
              <Picker.Item label='Male' value='male' />
              <Picker.Item label='Female' value='female' />
            </Picker>
          </View>
        </View>

        <View style={footerStyle}>
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
        </View>
      </View>
    );
  }
}

const styles = {
  mainWrapperStyle: {
    flex: 1,
    justifyContent: 'space-between'
  },
  mainContentStyle: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'space-between',
    flex: 1
  },
  footerStyle: {
    marginTop: 10,
    borderRadius: 0,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export default Fill;
