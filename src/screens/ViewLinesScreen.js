import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Divider, FormLabel, FormInput, Header, List, ListItem } from 'react-native-elements'; 

import LocalStorage from '../storage/LocalStorage';

export class ViewLinesScreen extends React.Component {
    //This removes the react-navigation header
    static navigationOptions = {
        title: 'Home',
        headerLeft : null,
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            currentTeamName: props.navigation.state.params.currentTeamName,
            fromHomeScreen: props.navigation.state.params.fromHomeScreen,
            team: {},
            lines: []
        }

        this.state.LocalStorage = new LocalStorage()
        this.getLines()
    }

    async getLines() {
        let team = await this.state.LocalStorage.getTeam(this.state.currentTeamName)

        this.setState({team})
        this.setState({lines: team.lines})
    }

    render() {
        return (
        <View style={{flex : 1}}>
            {this.state.fromHomeScreen && <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                leftComponent={{
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => this.props.navigation.goBack(),
                }}
                centerComponent={{ text: 'Lines', style: { color: '#fff', fontSize:20 } }} 
                rightComponent={{
                    icon: 'add',
                    color: '#fff',
                    onPress: () => this.props.navigation.navigate('CreateLine', {team : this.state.team, players: this.state.team.players}),
                }}
            />}

            {!this.state.fromHomeScreen && <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                leftComponent={{
                    icon: 'home',
                    color: '#fff',
                    onPress: () => this.props.navigation.navigate('Home'),
                }}
                centerComponent={{ text: 'Lines', style: { color: '#fff', fontSize:20 } }} 
                rightComponent={{
                    icon: 'add',
                    color: '#fff',
                    onPress: () => this.props.navigation.navigate('CreateLine', {team : this.state.team, players: this.state.team.players}),
                }}
            />}
            <View >
                <ScrollView>
                    <List>
                        {
                            this.state.lines.map((line, i) => (
                                <ListItem
                                    key={i}
                                    title={line.name}
                                    hideChevron={true}
                                    onPress={() => {this.props.navigation.navigate('LineDetail', {line, currentTeamName: this.state.currentTeamName})}}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        </View>
        );
    }

}

const styles = StyleSheet.create({
    halfWidth: {
        flex: .5
    },
    button: {
        borderRadius: 10,
        marginBottom: 10
    }
});

