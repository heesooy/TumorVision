import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Button } from './components/common';

class Result extends React.Component {
  static navigationOptions = {
    title: 'Result',
  };

  render() {
    const { params } = this.props.navigation.state;
    const age = params ? params.age : null;
    const sex = params ? params.sex : null;
    const image = params ? params.image : null;
    const region = params ? params.region : null;

    console.log(image);

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
              <Image
                style={{
                  height: 300,
                  flex: 1,
                  width: null
                }}
                source={{ uri: image.uri }}
              />
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
