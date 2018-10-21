import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from './components/common';

class Start extends React.Component {
  static navigationOptions = {
    title: 'TumorVision',
  };

  render() {
    const {
      mainWrapperStyle,
      mainContentStyle,
      footerStyle
    } = styles;

    return (
      <View style={mainWrapperStyle}>
        <View style={mainContentStyle}>
          <View style={{ marginTop: 25, marginBottom: 20 }} />
          <Image source={{ uri: 'https://i.imgur.com/9r7ZWRF.png' }} style={{ width: 300, height: 300 }} />
          <Text style={{ marginTop: 35, fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Heesoo Yang    Joe Carolan</Text>
          <Text style={{ marginTop: 3, fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Dev Satpathy    Danielle Yang</Text>
          <Text style={{ marginTop: 35, fontSize: 14, textAlign: 'center', padding: 15, flexWrap: 'wrap' }}>This application visually analyzes skin lesions from pictures to determine whether the lesions correspond to a few known types of cancer or some other significant skin conditions.</Text>
          <Text style={{ marginTop: 50, fontSize: 14, textAlign: 'center', color: '#808080', marginLeft: 10, marginRight: 10 }}>Created 10/21/2018 for BoilerMake VI</Text>
        </View>

        <View style={footerStyle}>
          <Button onPress={() => this.props.navigation.navigate('Fill')}>
            Get started
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

export default Start;
