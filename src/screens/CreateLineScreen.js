import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Divider, FormLabel, FormInput, Header, List, ListItem } from 'react-native-elements'; 

import LocalStorage from '../storage/LocalStorage';
import PlayerSelector from '../components/playerSelector'

export class CreateLineScreen extends React.Component {
    //This removes the react-navigation header
    static navigationOptions = {
        title: 'Home',
        headerLeft : null,
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            team: props.navigation.state.params.team,
            lineName: '',
            playersAvailable: props.navigation.state.params.players,
            playersSelected: [],
            fromCreateTeam: props.navigation.state.params.fromCreateTeam ? true: false
        }
        this.state.LocalStorage = new LocalStorage()

        console.log(this.state)
    }

    render() {
        return (
        <View style={{flex : 1}}>
            {!this.state.fromCreateTeam && 
                <Header
                    outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: () => this.props.navigation.goBack(),
                    }}
                    centerComponent={{ text: 'Create Line', style: { color: '#fff', fontSize:20 } }} 
                />
            }
            {this.state.fromCreateTeam && 
                <Header
                    outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                    leftComponent={{
                        icon: 'home',
                        color: '#fff',
                        onPress: () => this.props.navigation.navigate('Home'),
                    }}
                    centerComponent={{ text: 'Create Line', style: { color: '#fff', fontSize:20 } }} 
                />
            }
            
            <View style={{flex: 0.15}}>
                <FormLabel>Line Name</FormLabel>
                <FormInput value={this.state.lineName} onChangeText={(lineName) => this.setState({lineName})}/>
            </View>
            <Divider style={{ backgroundColor: 'black'}} />
            <PlayerSelector 
                playersSelected={this.state.playersSelected}
                playersAvailable={this.state.playersAvailable}
                updatePlayers={this.updatePlayers.bind(this)}
            />
            <View style={{marginTop: 10}}>
                <Button
                    raised
                    buttonStyle={[{backgroundColor: '#02968A'}]}
                    textStyle={{textAlign: 'center'}}
                    title={`Save Line`}
                    onPress={() => this.saveLine()}
                    disabled={!this.lineIsValid()}
                />
            </View>
        </View>
        );
    }
    
    // checks if the line is valid
    lineIsValid() {
        // a line needs a name and 7 players
        return this.state.lineName != "" && 
               this.state.playersSelected.length == 7
    }
    updatePlayers(currentPlayersAvailable, currentPlayersSelected) {
        this.setState({playersAvailable : currentPlayersAvailable})
        this.setState({playersSelected: currentPlayersSelected})
    }

    saveLine() {
        console.log(this.state.lineName);
        if (!this.state.lineName) {
            console.log("what the fuck dude")
        }

        let currentTeam = Object.assign({}, this.state.team)

        currentTeam.lines.push({name: this.state.lineName, players: this.state.playersSelected})

        this.state.LocalStorage.setTeam(currentTeam.name, currentTeam)

        this.props.navigation.navigate('ViewLines', {currentTeamName : currentTeam.name})
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

