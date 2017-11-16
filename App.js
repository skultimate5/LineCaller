import React from 'react';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './src/screens/HomeScreen';
import { CreateTeamScreen } from './src/screens/CreateTeamScreen';
import { ViewTeamScreen } from './src/screens/ViewTeamScreen';
import { CreateLineScreen } from './src/screens/CreateLineScreen';
import { ViewLinesScreen } from './src/screens/ViewLinesScreen';
import { LineDetailScreen } from './src/screens/LineDetailScreen';

import { StyleSheet, Text, View } from 'react-native';

const LineCaller = StackNavigator({
  Home: {screen: HomeScreen},
  CreateTeam: {screen: CreateTeamScreen},
  ViewTeam: {screen: ViewTeamScreen},
  CreateLine: {screen: CreateLineScreen},
  ViewLines: {screen: ViewLinesScreen},
  LineDetail: {screen: LineDetailScreen}
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
