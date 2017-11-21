import React from 'react';
import { AsyncStorage, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, ButtonGroup, FormLabel, FormInput, Header } from 'react-native-elements'; 

import LocalStorage from '../storage/LocalStorage.js';

export class GameOverviewScreen extends React.Component {
    //This removes the react-navigation header
    static navigationOptions = {
        title: 'Home',
        headerLeft : null,
        header: null
    };

    constructor(props) {
        super(props)

        console.log(props)

        this.state = {
            game : props.navigation.state.params.game
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
                centerComponent={{ text: 'Game Overview', style: { color: '#fff', fontSize:20 } }} 
            />
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.5}}>
                        <Text>{this.state.game.opponent}</Text>
                        <Text>{this.state.game.oppScore}</Text>
                    </View> 
                    <View style={{flex: 0.5}}>
                        <Text> This team </Text>
                        <Text>{this.state.game.teamScore}</Text>
                    </View>                       
                </View>    
                        

                    <View style={[styles.button, {marginTop: 10}]}>
                        <Button
                            raised
                            buttonStyle={[{backgroundColor: '#02968A'}]}
                            textStyle={{textAlign: 'center'}}
                            title={`New Point`}
                            //onPress={() => this.saveAndStartGame()}
                            //disabled={!this.teamIsValid()}
                        />
                    </View>
            </View>
        </View>
        );
    }

    saveAndStartGame() {

        let game = {
            opponent : this.state.oppTeamNeam,
            gameTo: parseInt(this.state.gameTo),
            startedOn: this.state.selectedIndex == 0 ? 'O' : 'D',
            oppScore : 0,
            teamScore : 0,
            lines: [],
            timestamp : new Date()
        }

        console.log(game)

        this.state.LocalStorage.setCurrentGame(game)

        //TODO : navigation to game overview page
    }

    // determines if the team is valid
    teamIsValid() {
        // team needs a name
        return this.state.teamName != "" && this.state.selectedIndex > -1 && this.state.selectedIndex < 2 && !isNaN(parseInt(this.state.gameTo))
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

