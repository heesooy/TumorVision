import React from 'react';
import { Image, View, Text, Picker } from 'react-native';
import { ImagePicker, ImageManipulator, Permissions } from 'expo';
import { Button, CardSection, Card } from './components/common';

class Capture extends React.Component {
  static navigationOptions = {
    title: 'Capture Picture',
    headerRight: (<View />)
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
      imageStyle,
      headerContentStyle,
      headerTextStyle,
      mainWrapperStyle,
      mainContentStyle,
      footerStyle
    } = styles;

    if (image == null) {
      return (
        <View style={mainWrapperStyle}>
          <View style={mainContentStyle}>
            <CardSection>
              <Text>Please take a photo of the lesion you would like to classify. Then, choose the closest body part to the lesion from the dropdown menu. Lighting conditions and image quality may affect the accuracy of results.</Text>
            </CardSection>
          </View>
          <View style={footerStyle}>
            <Button onPress={this.pickImage}>Take picture</Button>
          </View>
        </View>);
    }

    return (
      <View style={mainWrapperStyle}>
        <View style={mainContentStyle}>

            <View style={headerContentStyle}>
              <Text style={headerTextStyle}>Your Picture</Text>
            </View>


          <CardSection>
            <Image style={imageStyle} source={{ uri: image.uri }} />
          </CardSection>

          <Text style={{ fontSize: 13, textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Choose the closest location to the lesion in the photo</Text>
          <View style={{ borderWidth: 1, borderColor: '#808080', marginTop: 5, borderRadius: 10 }}>
            <Picker
              mode='dropdown'
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
          </View>
        </View>

        <View style={footerStyle}>
          {this.renderNextButton()}
        </View>
      </View>
    );
  }

}

const styles = {
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
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

export default Capture;
