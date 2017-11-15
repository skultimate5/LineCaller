import React from 'react';
import { AsyncStorage, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, FormLabel, FormInput, Header, Icon, List, ListItem } from 'react-native-elements'; 

import LocalStorage from '../storage/LocalStorage.js';

export class CreateTeamScreen extends React.Component {
    //This removes the react-navigation header
    static navigationOptions = {
        title: 'Home',
        headerLeft : null,
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            currentPlayerName: '',
            players: [],
            teamName: ''
        }
        this.state.LocalStorage = new LocalStorage()
    }

    render() {
        return (
        <View style={styles.container}>
            <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                leftComponent={{
                    icon: 'home',
                    color: '#fff',
                    onPress: () => this.props.navigation.navigate('Home'),
                }}
                centerComponent={{ text: 'Create Team', style: { color: '#fff', fontSize:20 } }} 
            />
            <View style={{flex: 1}}>
                    <FormLabel>Team Name</FormLabel>
                    <FormInput value={this.state.teamName} onChangeText={(teamName) => this.setState({teamName})}/>
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

                    <ScrollView>
                        <List containerStyle={{marginBottom: 20}} >
                            {
                                this.state.players.map((player, i) => (
                                <ListItem
                                    key={i}
                                    title={player}
                                    hideChevron={true}
                                />
                                ))
                            }
                        </List>
                    </ScrollView>
                    <View style={{marginTop: 10}}>
                        <Button
                            raised
                            buttonStyle={[{backgroundColor: '#02968A'}]}
                            textStyle={{textAlign: 'center'}}
                            title={`Next`}
                            onPress={() => this.saveTeam()}
                        />
                    </View>
            </View>
        </View>
        );
    }

    renderFooter = () => {
        return (
          <View style={styles.button}>
            <Text style={styles.buttonText}>Show unlinked tags</Text>
          </View>
        )
    }


    addPlayer() {
        //TODO : make sure no duplicate players
        let currentPlayerName = this.state.currentPlayerName.trim(),
            allPlayers = [currentPlayerName,...this.state.players]

        this.setState({players: allPlayers})
        this.setState({currentPlayerName: ''})
    }

    saveTeam() {
        var team = {
            name : this.state.teamName.trim(),
            players: this.state.players.sort(),
            lines: []
        }

        this.state.LocalStorage.setTeam(team.name, team)
        this.state.LocalStorage.setCurrentTeamName(team.name)

        this.props.navigation.navigate('CreateLine', {team : team, players: team.players, fromCreateTeam: true})
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
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 10
    }
});

