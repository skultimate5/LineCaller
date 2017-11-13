import React from 'react';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './src/screens/HomeScreen';
import { CreateTeamScreen } from './src/screens/CreateTeamScreen';
import { CreateLineScreen } from './src/screens/CreateLineScreen';
import { StyleSheet, Text, View } from 'react-native';

const LineCaller = StackNavigator({
  Home: {screen: HomeScreen},
  CreateTeam: {screen: CreateTeamScreen},
  CreateLine: {screen: CreateLineScreen}
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
