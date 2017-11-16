import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Divider, FormLabel, FormInput, Header, List, ListItem } from 'react-native-elements'; 

import LocalStorage from '../storage/LocalStorage';
import PlayerSelector from '../components/playerSelector'

export class LineDetailScreen extends React.Component {
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
            line: props.navigation.state.params.line,
            playersAvailable: ['A'],
            playersSelected: props.navigation.state.params.line.players,
            team: {}
        }

        this.state.LocalStorage = new LocalStorage()
        this.getTeamWithoutLine()
    }

    async getTeamWithoutLine() {
        let team = await this.state.LocalStorage.getTeam(this.state.currentTeamName),
            players = team.players,
            removePlayers = this.state.playersSelected

        //remove players that are on this line already
        players = players.filter((player) => {
            return !removePlayers.includes(player)
        })
        
        this.setState({team})
        this.setState({playersAvailable : players})
    }

    render() {
        return (
        <View style={{flex : 1}}>
            <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                leftComponent={{
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => this.props.navigation.goBack(),
                }}
                centerComponent={{ text: this.state.line.name, style: { color: '#fff', fontSize:20 } }} 
                rightComponent={{
                    icon: 'edit',
                    color: '#fff',
                    onPress: () => this.props.navigation.navigate('CreateLine', {playersAvailable : this.state.playersAvailable, playersSelected : this.state.playersSelected, line : this.state.line, team : this.state.team, fromLineDetailScreen : true}),
                    
                }}
            />
            <View style={{flex : 1}}>
                <ScrollView>
                    <List>
                        {
                            this.state.line.players.map((player, i) => (
                                <ListItem
                                    key={i}
                                    title={player}
                                    hideChevron={true}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
                <View style={[styles.button, {marginTop: 10}]}>
                    <Button
                        raised
                        icon={{name : 'delete'}}
                        buttonStyle={[{backgroundColor: '#cc0000'}]}
                        textStyle={{textAlign: 'center'}}
                        title={`Delete Line`}
                        onPress={() => this.deleteLine()}
                    />
                </View>
            </View>
        </View>
        );
    }

    deleteLine() {
        let index = -1,
            currentTeam = Object.assign({}, this.state.team)

        currentTeam.lines.forEach((line, i) => {
            if (this.state.line.name === line.name) {
                index = i
            }
        })

        currentTeam.lines.splice(index, 1)    
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
        marginBottom: 10,
        marginTop: 25
    }
});

