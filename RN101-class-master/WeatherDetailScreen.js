import React from 'react';
import { StyleSheet, ImageBackground, Image, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    // const city = navigation.getParam('city', null);
    const city = 'Daejeon';

    fetch(`http://demo6468405.mockable.io/weather-crawlers/current-weathers/by-city-name/${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style = {styles.fontcss}>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let humidity = this.state.main.humidity;
    let pressure = this.state.main.pressure;


    let wind = this.state.wind.speed;


    if(celsius > 1.6 && celsius < 24.8){
      return (
        <View style={styles.SFcontainer}>
          <Text style = {styles.fontcss}>온도: {celsius.toFixed(1)}</Text>
          <Text style = {styles.fontcss}>습도: {humidity+""}</Text>
        <Text style = {styles.fontcss}>기압: {pressure}</Text>

        <Text style = {styles.fontcss}>풍속 : {wind}</Text>
          <Text style = {styles.fontcss}>It's Spring or Fall!</Text>
           <Image style={styles.imgcss} source={require('./assets/sakura.png') } />
        </View>
      );
    }

    if(celsius >= 24.8){
      return (
        <View style={styles.Summercontainer}>
          <Text style = {styles.fontcss}>온도: {celsius.toFixed(1)}</Text>
          <Text style = {styles.fontcss}>습도: {humidity+""}</Text>
        <Text style = {styles.fontcss}>기압: {pressure}</Text>

        <Text style = {styles.fontcss}>풍속 : {wind}</Text>
          <Text style = {styles.fontcss}>It's Summer!</Text>
           <Image style={styles.imgcss} source={require('./assets/sunny.png') } />
        </View>
      );
    }

    if(celsius <= 1.6){
      return (
        <View style={styles.Wintercontainer}>
          <Text style = {styles.fontcss}>온도: {celsius.toFixed(1)}</Text>
          <Text style = {styles.fontcss}>습도: {humidity+""}</Text>
        <Text style = {styles.fontcss}>기압: {pressure}</Text>

        <Text style = {styles.fontcss}>풍속 : {wind}</Text>
          <Text style = {styles.fontcss}>It's Winter!</Text>
           <Image style={styles.imgcss} source={require('./assets/snowflake.png') } />
        </View>
      );
    }




  }
}

const styles = StyleSheet.create({
  SFcontainer: {
    flex: 1,
    backgroundColor: '#FFB6C1',
    marginTop: Constants.statusBarHeight,
  },
  Summercontainer: {
    flex: 1,
    backgroundColor: 'skyblue',
    marginTop: Constants.statusBarHeight,
  },
  Wintercontainer: {
    flex: 1,
    backgroundColor: '#B0C4DE',
    marginTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  imgcss:{
    width : 130,
    height : 130,
  },
  fontcss:{
    fontSize:35,
    textAlign:'center',
    borderWidth:1,
  },
});
