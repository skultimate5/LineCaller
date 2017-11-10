import React from 'react';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './screens/HomeScreen';
import { StyleSheet, Text, View } from 'react-native';

const LineCaller = StackNavigator({
  Home: {screen: HomeScreen}
},
{
  initialRouteName: 'Home',
}
)

export default class App extends React.Component {
render() {
  return <LineCaller />;
}
}
