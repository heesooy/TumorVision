import React from 'react';
import { View, Text, Image } from 'react-native';
import axios from 'axios';
import { Card, CardSection, Button, Spinner } from './components/common';

class Result extends React.Component {
  static navigationOptions = {
    title: 'Result',
  };

  state = {
    classification: null
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const age = params ? params.age : null;
    const sex = params ? params.sex : null;
    const image = params ? params.image : null;
    const region = params ? params.region : null;

    this.props.age = age;
    this.props.sex = sex;
    this.props.image = image;
    this.props.region = region;
    const classification = this.getClassification(image, sex, age, region);
    this.setState({ classification });
  }

  getClassification(image, sex, age, region) {
    const URL = `http://35.232.150.236:5000/api/classify/?raw=${image.base64}/${sex}/${age}/${region}`;
     axios.get(URL)
    .then((response) => {
      console.log('hey! ' + response.data);
      return response.data;
    });
  }

  render() {
    const { image, sex, age, region } = this.props;
    const { classification } = this.state;

    return (
      <View>
        <Card>
          <CardSection>
            <Card>
              <Text>{age}</Text>
            </Card>

            <Card>
              <Text>{sex}</Text>
            </Card>

            <Card>
              <Text>{region}</Text>
            </Card>
          </CardSection>

          <CardSection>
            <Card>
              <Text>{classification}!!!</Text>
            </Card>
          </CardSection>

          <CardSection>
            <Button
              onPress={() => this.props.navigation.navigate('Start', { })}
            >
              Return to start
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default Result;
