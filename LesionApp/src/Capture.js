import React from 'react';
import { Image, View, Text } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Button, CardSection, Card } from './components/common';

class Capture extends React.Component {
  static navigationOptions = {
    title: 'Capture'
  };

  state = {
    image: null,
    region: 'buttocks'
  };

  pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3]
    });

    //console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result });
    }
  }

  renderNextButton() {
    const { params } = this.props.navigation.state;
    const age = params ? params.age : null;
    const sex = params ? params.sex : null;

    return (
      <Button
      onPress={() =>
        this.props.navigation.navigate('Result', {
          age,
          sex,
          image: this.state.image,
          region: this.state.region
        })
      }
      >
      Next
      </Button>
    );
  }

  render() {
    const image = this.state.image;
    const {
      headerContentStyle,
      headerTextStyle,
      imageStyle
    } = styles;

    if (image == null) {
      return (<Card>
        <CardSection>
          <Button onPress={this.pickImage}>Take picture</Button>
        </CardSection>
      </Card>);
    }

    return (
      <Card>
        <CardSection>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>Your Picture</Text>
          </View>
        </CardSection>

        <CardSection>
          <Image style={imageStyle} source={{ uri: image.uri }} />
        </CardSection>

        <CardSection>
          <Text>Region</Text>
        </CardSection>

        <CardSection>
          {this.renderNextButton()}
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
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default Capture;
