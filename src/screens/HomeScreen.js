import React from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Header } from 'react-native-elements'; 

import LocalStorage from '../storage/LocalStorage.js';

export class HomeScreen extends React.Component {
    //This removes the react-navigation header
    static navigationOptions = {
        title: 'Home',
        headerLeft : null,
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            currentTeamName: '',
            currentGame: {},
            hasStoredTeam : false,
            isLoading: true,
            LocalStorage: new LocalStorage()
        }

        //this.state.LocalStorage.removeAllTeams()
        //this.state.LocalStorage.removeCurrentTeamName()

        /*
        this.state.LocalStorage.getAllTeams().then((items) => {
             console.log(items)
        })
        */
    }
    
    componentWillMount() {
        this.setState({isLoading : true})
        this.getCurrentTeamName()
        this.getAllTeams()
        this.getCurrentGame()
    }

    async getCurrentGame() {
        let currentGame = await this.state.LocalStorage.getCurrentGame()

        console.log(currentGame)
        this.setState({currentGame})
    }

    async getCurrentTeamName() {
        let currentTeamName = await this.state.LocalStorage.getCurrentTeamName()

        this.setState({currentTeamName})
        this.setState({isLoading : false})
    }

    async getAllTeams() {
        let teams = await this.state.LocalStorage.getAllTeams()

        if (teams.length > 0) {
            this.setState({hasStoredTeam : true})
        }
    }

    checkIfRemoveData() {
        Alert.alert(
            'Hold on',
            'Are you sure you want to delete all data?',
            [
              {text: 'Yes', onPress: () => this.removeData()},
              {text: 'No', onPress: () => console.log('No')},
            ],
            { cancelable: false }
        )
    }

    async deleteCurrentGame() {
        await this.state.LocalStorage.removeCurrentGame()
        let currentGame = await this.state.LocalStorage.getCurrentGame()

        this.setState({currentGame})
    }

    // remove the data 
    async removeData() {
        this.state.LocalStorage.removeAllTeams();
        this.state.LocalStorage.removeCurrentGame();
        await this.state.LocalStorage.removeCurrentTeamName();
        let currentTeamName = await this.state.LocalStorage.getCurrentTeamName();
        this.setState({
            currentTeamName: currentTeamName,
            hasStoredTeam: false,
            isLoading: false
        });
    }

    render() {
        return (
        <View>
            <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                centerComponent={{ text: 'Home', style: { color: '#fff', fontSize:20 } }} 
            />
            <View>
                <View>
                    {this.state.isLoading && <Text style={{ color: 'red', textAlign: 'center' }}>Loading</Text>}
                    {!this.state.isLoading && this.state.currentTeamName != null && 
                        <View>
                            <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 15, marginTop: 5 }}>Team : {this.state.currentTeamName}</Text>
                            <View style={styles.button}>
                                {!this.state.currentGame &&
                                    <Button
                                        raised
                                        icon={{name : 'add'}}
                                        buttonStyle={[{backgroundColor: '#02968A'}]}
                                        textStyle={{textAlign: 'center'}}
                                        title={`Create New Game`}
                                        //disabled={true}
                                        onPress={() => this.props.navigation.navigate('CreateNewGame', {currentTeamName: this.state.currentTeamName})}                                    
                                    />
                                }
                                {this.state.currentGame &&
                                    <Button
                                        raised
                                        icon={{name : 'directions-run'}}
                                        buttonStyle={[{backgroundColor: '#02968A'}]}
                                        textStyle={{textAlign: 'center'}}
                                        title={`Current Game`}
                                        //disabled={true}
                                        onPress={() => this.props.navigation.navigate('GameOverview', {game : this.state.currentGame, currentTeamName: this.state.currentTeamName})}                                    
                                    />
                                }
                            </View>
                            <View style={styles.button}>
                                <Button
                                    raised
                                    icon={{name : 'list'}}
                                    buttonStyle={[{backgroundColor: '#2095F2'}]}
                                    textStyle={{textAlign: 'center'}}
                                    title={`View Lines`}
                                    onPress={() => this.props.navigation.navigate('ViewLines', {currentTeamName : this.state.currentTeamName})}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    raised
                                    icon={{name : 'nature-people'}}
                                    buttonStyle={[{backgroundColor: '#9C28B0'}]}
                                    textStyle={{textAlign: 'center'}}
                                    title={`Create Team`}
                                    onPress={() => this.props.navigation.navigate('CreateTeam')}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    raised
                                    icon={{name : 'people'}}
                                    buttonStyle={[{backgroundColor: '#8BC24A'}]}
                                    textStyle={{textAlign: 'center'}}
                                    title={`View Teams`}
                                    onPress={() => this.props.navigation.navigate('ViewTeam', {currentTeamName: this.state.currentTeamName})}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    raised
                                    icon={{name : 'delete'}}
                                    buttonStyle={[{backgroundColor: '#cc0000'}]}
                                    textStyle={{textAlign: 'center'}}
                                    title={`Destroy Data `}
                                    onPress={() => this.checkIfRemoveData()}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    raised
                                    icon={{name : 'delete'}}
                                    buttonStyle={[{backgroundColor: '#cc0000'}]}
                                    textStyle={{textAlign: 'center'}}
                                    title={`Delete Current Game `}
                                    onPress={() => this.deleteCurrentGame()}
                                />
                            </View>
                        </View>
                    }
                    {!this.state.isLoading && this.state.currentTeamName == null && 
                        <View>
                            <View style={styles.button}>
                                <Button
                                    raised
                                    icon={{name : 'people'}}
                                    buttonStyle={[{backgroundColor: '#02968A'}]}
                                    textStyle={{textAlign: 'center'}}
                                    title={`Create Team`}
                                    onPress={() => this.props.navigation.navigate('CreateTeam')}
                                />
                            </View>
                            {this.state.hasStoredTeam && 
                                <View style={styles.button}>
                                    <Button
                                        raised
                                        icon={{name : 'people'}}
                                        buttonStyle={[{backgroundColor: '#8BC24A'}]}
                                        textStyle={{textAlign: 'center'}}
                                        title={`View Teams`}
                                        onPress={() => this.props.navigation.navigate('ViewTeam', {currentTeamName: this.state.currentTeamName})}
                                    />
                                </View>
                            }
                        </View>
                    }
                </View>
            </View>
        </View>
        );

    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        marginTop: 25
    }
});

