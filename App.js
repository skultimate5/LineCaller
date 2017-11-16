import React from 'react';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './src/screens/HomeScreen';
import { CreateTeamScreen } from './src/screens/CreateTeamScreen';
import { ChangeTeamScreen } from './src/screens/ChangeTeamScreen';
import { CreateLineScreen } from './src/screens/CreateLineScreen';
import { ViewLinesScreen } from './src/screens/ViewLinesScreen';

import { StyleSheet, Text, View } from 'react-native';

const LineCaller = StackNavigator({
  Home: {screen: HomeScreen},
  CreateTeam: {screen: CreateTeamScreen},
  ChangeTeam: {screen: ChangeTeamScreen},
  CreateLine: {screen: CreateLineScreen},
  ViewLines: {screen: ViewLinesScreen}
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
