import React from 'react';
import { AsyncStorage, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, ButtonGroup, FormLabel, FormInput, Header } from 'react-native-elements'; 

import LocalStorage from '../storage/LocalStorage.js';

export class CreateNewGameScreen extends React.Component {
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
            oppTeamNeam: '',
            gameTo: '',
            selectedIndex: 2
        }

        this.state.LocalStorage = new LocalStorage()
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
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
                centerComponent={{ text: 'Create New Game', style: { color: '#fff', fontSize:20 } }} 
            />
            <View style={{flex: 1}}>
                    <FormLabel>Opponent Name</FormLabel>
                    <FormInput value={this.state.oppTeamNeam} onChangeText={(oppTeamNeam) => this.setState({oppTeamNeam})}/>
                    <FormLabel>Game To</FormLabel>
                    <FormInput value={this.state.gameTo} onChangeText={(gameTo) => this.setState({gameTo})}/>
                        
                    <ButtonGroup
                        selectedBackgroundColor='#98E0E7'
                        onPress={this.updateIndex.bind(this)}
                        selectedIndex={this.state.selectedIndex}
                        buttons={['O', 'D']}
                        containerStyle={{height: 30}}
                    />

                    <View style={[styles.button, {marginTop: 10}]}>
                        <Button
                            raised
                            buttonStyle={[{backgroundColor: '#02968A'}]}
                            textStyle={{textAlign: 'center'}}
                            title={`Start Game`}
                            onPress={() => this.saveAndStartGame()}
                            disabled={!this.teamIsValid()}
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
            timestamp : new Date(),
            playerStats: []
        }

        console.log(game)

        this.state.LocalStorage.setCurrentGame(game)

        this.props.navigation.navigate('GameOverview', {game, currentTeamName: this.state.currentTeamName})
    
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

