import React from 'react';
import { Component } from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements'; 

export default class PlayerSelector extends Component {

    addPlayer(player, playersAvailable, playersSelected, updatePlayers) {
        let currentPlayersAvailable = playersAvailable.slice(),
            currentPlayerIndex = currentPlayersAvailable.indexOf(player)
        
        currentPlayersAvailable.splice(currentPlayerIndex, 1)

        let currentPlayersSelected = playersSelected.concat(player)
        
        currentPlayersSelected.sort()


        updatePlayers(currentPlayersAvailable, currentPlayersSelected)
    }

    removePlayer(player, playersAvailable, playersSelected, updatePlayers) {
        //TODO : should this ask to remove? or automatically remove?
        let currentPlayersSelected = playersSelected.slice(),
            currentPlayerIndex = currentPlayersSelected.indexOf(player)
    
        currentPlayersSelected.splice(currentPlayerIndex, 1)

        let currentPlayersAvailable = playersAvailable.concat(player)

        currentPlayersAvailable.sort()

        updatePlayers(currentPlayersAvailable, currentPlayersSelected)        
    }

    render = () => {
        const { playersAvailable, playersSelected, updatePlayers, showPlayingTime, playingTime } = this.props;
        
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={[styles.halfWidth, {paddingRight: 10}]}>
                    <Text style={{justifyContent: 'center', alignContent: 'center'}}>Players Selected</Text>
                    <ScrollView>
                        {showPlayingTime && <List >
                            {
                                playersSelected.map((player, i) => (
                                <ListItem
                                    key={i}
                                    title={player}
                                    hideChevron={true}
                                    onPress={() => {this.removePlayer(player, playersAvailable, playersSelected, updatePlayers)}}
                                    badge={{ value: playingTime[player]}}
                                />
                                ))
                            }
                        </List>}
                        {!showPlayingTime && <List >
                            {
                                playersSelected.map((player, i) => (
                                <ListItem
                                    key={i}
                                    title={player}
                                    hideChevron={true}
                                    onPress={() => {this.removePlayer(player, playersAvailable, playersSelected, updatePlayers)}}
                                />
                                ))
                            }
                        </List>}
                    </ScrollView>
                </View>

                <View style={[styles.halfWidth]}>
                    <Text style={{justifyContent: 'center', alignContent: 'center'}}>Players Available</Text>
                    <ScrollView>
                        {showPlayingTime && <List>
                            {
                                playersAvailable.map((player, i) => (
                                <ListItem
                                    key={i}
                                    title={player}
                                    hideChevron={true}
                                    onPress={() => {this.addPlayer(player, playersAvailable, playersSelected, updatePlayers)}}
                                    badge={{ value: playingTime[player] }}
                                />
                                ))
                            }
                        </List>}
                        {!showPlayingTime && <List>
                            {
                                playersAvailable.map((player, i) => (
                                <ListItem
                                    key={i}
                                    title={player}
                                    hideChevron={true}
                                    onPress={() => {this.addPlayer(player, playersAvailable, playersSelected, updatePlayers)}}
                                />
                                ))
                            }
                        </List>}
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

