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

    async getCurrentTeamData() {
        let currentTeamName = this.state.currentTeamName,
            currentTeamData = await this.state.LocalStorage.getTeam(currentTeamName)

        return currentTeamData
    }   

    exportData() {

        this.getCurrentTeamData().then((currentTeamData) => {
            console.log(currentTeamData)
            // var body = {
            //     "personalizations": [{"to": [{"email": "sophia.knowles20@gmail.com"}]}],
            //     "from": {"email": "sophia.knowles20@gmail.com"},
            //     "subject": "Sending from app",
            //     "content": [{"type": "text/plain", "value": JSON.stringify(currentTeamData)}]}

            // console.log(body)
    
            // fetch('https://api.sendgrid.com/v3/mail/send', {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': 'Bearer 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',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(body)
            // })
            // .then((response) => {
            //     if(response.status === 202) {
            //         Alert.alert(
            //             'Your data has been emailed to you',
            //             '',
            //             [
            //               {text: 'OK', onPress: () => console.log('OK')}
            //             ],
            //             { cancelable: false }
            //         )
            //     }
            // })
            // // .then((responseJson) => {
            // //   console.log(responseJson)
            // // })
            // .catch((error) => {
            //   console.error(error);
            // });
        })
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
                                    onPress={() => this.props.navigation.navigate('ViewLines', {currentTeamName : this.state.currentTeamName, fromHomeScreen: true})}
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
                            <View style={styles.button}>
                                <Button
                                    raised
                                    buttonStyle={[{backgroundColor: 'blue'}]}
                                    textStyle={{textAlign: 'center'}}
                                    title={`Export Team Data`}
                                    onPress={() => this.exportData()}
                                    disabled={true}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    raised
                                    buttonStyle={[{backgroundColor: 'blue'}]}
                                    textStyle={{textAlign: 'center'}}
                                    title={`Test During Point Screen`}
                                    onPress={() => this.props.navigation.navigate('TestDuringPoint')}       
                                    disabled={true}             
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

