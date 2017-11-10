import React from 'react';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './screens/HomeScreen';
import { CreateTeamScreen } from './screens/CreateTeamScreen';
import { CreateLineScreen } from './screens/CreateLineScreen';
import { StyleSheet, Text, View } from 'react-native';

const LineCaller = StackNavigator({
  Home: {screen: HomeScreen},
  CreateTeam: {screen: CreateTeamScreen},
  CreateLine: {screen: CreateLineScreen}
},
{
  initialRouteName: 'CreateTeam',
}
)

export default class App extends React.Component {
render() {
  return <LineCaller />;
}
}
