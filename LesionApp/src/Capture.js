import React from 'react';
import { Image, View, Text } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Button, CardSection, Card } from './components/common';

class Capture extends React.Component {
  static navigationOptions = {
    title: 'Capture',
  };

  state = {
    image: null,
  };

  pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  renderContent() {
    const { navigate } = this.props.navigation;

    if (this.state.image != null) {
      return (
        <Button
          onPress={() =>
          navigate('Result', { name: 'Jane' })
          }
        >Next</Button>
      );
    }
    return (
      <Button onPress={this.pickImage}>Take picture</Button>
    );
  }

  render() {
    const { image } = this.state;

    const {
      headerContentStyle,
      headerTextStyle,
      thumbnailStyle,
      thumbnailContainerStyle,
      imageStyle
    } = styles;

    return (
      <Card>
        <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image style={thumbnailStyle} source={{ uri: image }} />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>Your Picture</Text>
        </View>
      </CardSection>
        <CardSection>
          <Image style={imageStyle} source={{ uri: image }} />
        </CardSection>
        <CardSection>
          {this.renderContent()}
        </CardSection>
      </Card>
    );
  }

}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18,
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default Capture;
