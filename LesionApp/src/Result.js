import React from 'react';
import { View, Text, Image } from 'react-native';
import axios from 'axios';
import { Card, CardSection, Button, Spinner } from './components/common';

class Result extends React.Component {
  static navigationOptions = {
    title: 'Result',
    headerRight: (<View />)
  };

  constructor() {
    super();
    this.state = {
      classification: null,
      age: null,
      sex: null,
      image: null,
      image_url: null,
      region: null
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const age = params ? params.age : null;
    const sex = params ? params.sex : null;
    const image = params ? params.image : null;
    const region = params ? params.region : null;

    this.setState({ age, sex, image, image_url: image.uri, region });
    this.getClassification(image, sex, age, region);
  }

  async getClassification(image, sex, age, region) {
    const URL = `http://35.232.150.236:5000/api/classify/?raw=${image.base64}/${sex}/${age}/${region}`;
    await axios.get(URL).then((response) => {
      this.setState({ classification: response.data });
    });
  }


  showResult(classification) {
    const intro = 'You may have ';
    const concl = ' It is highly recommended that you seek further testing for this disease.'
    switch (classification) {
      case 'bcc' :
        return intro + 'basal cell carcinoma: a cancerous, treatable type of skin cancer that begins in the basal cells.' + concl;
      case 'akiec' :
        return intro + 'intraepithelial carcinoma, also known as Bowen\'s disease: a treatable, cancerous, neoplastic skin disease. Or you may have actinic keratoses, a pre-condition to Bowen\'s disease.' + concl;
      case 'df' :
        return intro + 'dermatofibroma: a cancerous, treatable tumor. Dermatofibroma is a very rare type of skin cancer that begins in connective tissue cells in the middle layer of your skin (dermis). It grows slowly and rarely spreads beyond the skin.' + concl;
      case 'bkl' :
        return intro + 'benign keratosis-like lesions. These are also known as solar lentigines, seborrheic keratoses and lichen-planus like keratoses. Non-cancerous seborrheic keratosis is one of the most common non-cancerous skin growths in older adults.';
      case 'mel' :
        return intro + 'melanoma: a treatable cancer, if detected early. Melanoma is the most serious type of skin cancer. Knowing the warning signs of skin cancer can help ensure that cancerous changes are detected and treated before the cancer has spread. Melanoma can be treated successfully if it is detected early.' + concl;
      case 'nv' :
        return intro + 'melanocytic nevi: a usually non-cancerous disorder of pigment-producing skin cells commonly called birth marks or moles. They can exist at birth or appear later. Rarely, melanocytic nevi can become cancerous. Most cases don\'t require treatment, but some cases require removal of the mole.';
      case 'vasc' :
        return intro + 'vascular lesions: non-cancerous, congenital malformations of the circulatory system. This includes angiomas, angiokeratomas, pyogenic granulomas and hemorrhage. For example, pyogenic granulomas are skin growths that are small, round, and usually bloody red in color. Doctors can remove them through a variety of methods.';
    }
  }

  getSummary(classification) {
    if (classification != null) {
      return (
        <View>
          <Text style={{ marginTop: 25, fontWeight: 'bold', textAlign: 'center' }}>Your result</Text>
          <Text style={{ marginLeft: 10, marginRight: 10, textAlign: 'center' }}>{this.showResult(classification)}</Text>
        </View>
      );
    } else {
      return <Spinner size="large" />;
    }
  }

  render() {
    const {
      mainWrapperStyle,
      mainContentStyle,
      footerStyle
    } = styles;
    const { classification, age, sex, region } = this.state;

    return (
      <View style={mainWrapperStyle}>
        <View style={mainContentStyle}>
          <CardSection>
            <Image
              style={{
                height: 300,
                flex: 1,
                width: null
              }}
              source={{ uri: this.state.image_url }}
            />
          </CardSection>

          <Text style={{ fontWeight: 'bold' }}>Your parameters</Text>
          <Text>Age: {age}, Sex: {sex}, Lesion location: {region}</Text>
          {this.getSummary(classification)}
        </View>

        <View style={footerStyle}>
          <Button
            onPress={() => this.props.navigation.navigate('Start', { })}
          >
            Return to start
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

export default Result;
