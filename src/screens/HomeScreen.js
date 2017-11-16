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
    
    componentDidMount() {
        this.setState({isLoading : true})
        this.getCurrentTeamName()
    }

    async getCurrentTeamName() {
        let currentTeamName = await this.state.LocalStorage.getCurrentTeamName()

        this.setState({currentTeamName})
        this.setState({isLoading : false})
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

    // remove the data 
    async removeData() {
        this.state.LocalStorage.removeAllTeams();
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
                                <Button
                                    raised
                                    icon={{name : 'add'}}
                                    buttonStyle={[{backgroundColor: '#02968A'}]}
                                    textStyle={{textAlign: 'center'}}
                                    title={`Create New Game`}
                                    disabled={true}
                                    onPress={() => console.log('Create New Game')}
                                />
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
                                    buttonStyle={[{backgroundColor: '#9C28B0'}]}
                                    textStyle={{textAlign: 'center'}}
                                    title={`Change Current Team`}
                                    onPress={() => this.props.navigation.navigate('ViewTeam')}
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
                        </View>
                    }
                    {!this.state.isLoading && this.state.currentTeamName == null && 
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

