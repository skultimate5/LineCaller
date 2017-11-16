import React from 'react';
import { Alert, AsyncStorage, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, FormLabel, FormInput, Header, Icon, List, ListItem } from 'react-native-elements'; 

import LocalStorage from '../storage/LocalStorage.js';

export class EditTeamScreen extends React.Component {
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
            currentPlayerName: '',
            players: props.navigation.state.params.team.players,
            error: false,
            errorMessage: ""
        }
        this.state.LocalStorage = new LocalStorage()
    }

    render() {
        return (
        <View style={styles.container}>
            <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                leftComponent={{
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => this.props.navigation.goBack(),
                }}
                centerComponent={{ text: `Edit ${this.state.team.name}`, style: { color: '#fff', fontSize:20 } }} 
            />
            <View style={{flex: 1}}>
                <FormLabel>Player Name</FormLabel>
                <FormInput value={this.state.currentPlayerName} onChangeText={(currentPlayerName) => this.setState({currentPlayerName})}/>
                    
                <View style={[styles.icon, {paddingTop: 20}]}>
                    <Icon
                        raised
                        name='add-user'
                        type='entypo'
                        color='black'
                        onPress={() => this.addPlayer()} />
                </View>
                {this.state.error &&
                    <View>
                        <Text style={{ color: 'red', textAlign: 'center' }}>{this.state.errorMessage}</Text>
                    </View>
                }
                <ScrollView>
                    <List containerStyle={{marginBottom: 20}} >
                        {
                            this.state.players.map((player, i) => (
                            <ListItem
                                key={i}
                                title={player}
                                hideChevron={true}
                                onLongPress={() => this.checkRemovePlayer(i)}
                            />
                            ))
                        }
                    </List>
                </ScrollView>
                <View style={[styles.button, {marginTop: 10}]}>
                    <Button
                        raised
                        buttonStyle={[{backgroundColor: '#02968A'}]}
                        textStyle={{textAlign: 'center'}}
                        title={`Save`}
                        onPress={() => this.saveTeam()}
                        disabled={!this.teamIsValid()}
                    />
                </View>
            </View>
        </View>
        );
    }

    removePlayer(playerIndex) {
        let currentPlayers = this.state.players.slice()

        currentPlayers.splice(playerIndex, 1)

        this.setState({players: currentPlayers})
    }

    checkRemovePlayer(playerIndex) {
        Alert.alert(
            'Hold on',
            'Are you sure you want to remove this player from this team?',
            [
              {text: 'Yes', onPress: () => this.removePlayer(playerIndex)},
              {text: 'No', onPress: () => console.log('No')},
            ],
            { cancelable: false }
        )
    }

    // determines if the team is valid
    teamIsValid() {
        // team needs a name and at least 7 players
        return this.state.teamName != "" && this.state.players.length > 6
    }

    addPlayer() {
        name = this.state.currentPlayerName.trim().toLowerCase();
        if (name == "") {    // don't want empty players
            this.setState({
                error: true, 
                errorMessage: "Empty player name"
            })
        } else if (this.state.players.indexOf(name) != -1) {   // don't want duplicate players
            this.setState({
                error: true, 
                errorMessage: "Duplicate player name"
            })
        } else {    // all is good
            let currentPlayerName = name,
                allPlayers = [currentPlayerName,...this.state.players]

            this.setState({
                players: allPlayers,
                currentPlayerName: '',
                error: false
            })
        }
    }

    saveTeam() {
        var team = {
            name : this.state.team.name,
            players: this.state.players.sort(),
            lines: []
        }

        this.state.LocalStorage.setTeam(team.name, team)
        this.state.LocalStorage.setCurrentTeamName(team.name)

        this.props.navigation.navigate('ViewTeam')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 25
    }
});

