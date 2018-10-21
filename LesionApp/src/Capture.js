import React from 'react';
import { Image, View, Text, Picker } from 'react-native';
import { ImagePicker, ImageManipulator, Permissions } from 'expo';
import { Button, CardSection, Card } from './components/common';

class Capture extends React.Component {
  static navigationOptions = {
    title: 'Capture'
  };

  state = {
    image: null,
    resized: null,
    region: 'back'
  };

  pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    //base64: true,

    const uri = result.uri;
    const actions = [];
    actions.push({ resize: { width: 600, height: 450 } });
    const resized = await ImageManipulator.manipulate(uri, actions, {
       base64: true
    });

    //console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result, resized });
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
            image: this.state.resized,
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
      return (
        <Card>
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
          <Card>
            <Picker
              style={{ width: 300 }}
              selectedValue={this.state.region}
              onValueChange={(value) => this.setState({ region: value })}
            >
              <Picker.Item label='Back' value='back' />
              <Picker.Item label='Lower Extremity' value='lower extremity' />
              <Picker.Item label='Scalp' value='scalp' />
              <Picker.Item label='Ear' value='ear' />
              <Picker.Item label='Face' value='face' />
              <Picker.Item label='Trunk' value='trunk' />
              <Picker.Item label='Chest' value='chest' />
              <Picker.Item label='Upper Extremity' value='upper extremity' />
              <Picker.Item label='Abdomen' value='abdomen' />
              <Picker.Item label='Hand' value='hand' />
              <Picker.Item label='Genital' value='genital' />
              <Picker.Item label='Neck' value='neck' />
              <Picker.Item label='Foot' value='foot' />
              <Picker.Item label='Acral' value='acral' />
              <Picker.Item label='Unknown' value='unknown' />
            </Picker>
          </Card>
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
