import React from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';
import { ScrollView, StackNavigator } from 'react-navigation';
import { Button, ButtonGroup, Divider, FormLabel, FormInput, Header, Icon } from 'react-native-elements';
import Modal from 'react-native-modal'



import LocalStorage from '../storage/LocalStorage.js';
import PlayerSelector from '../components/playerSelector'


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
            game : props.navigation.state.params.game,
            currentTeamName : props.navigation.state.params.currentTeamName,
            playersSelected : [],
            playersAvailable : [],
            lines : [],
            currentTeam: {},
            lineSelectedIndex : 0,
            isModalVisible : false
        }

        this.state.LocalStorage = new LocalStorage()
    }

    componentWillMount() {
        this.getTeam()
    }

    async getTeam() {
        let team = await this.state.LocalStorage.getTeam(this.state.currentTeamName),
            lines = team.lines,
            players = team.players
        
        //put All players in first index of lines array
        lines.unshift({name : 'All', players : players})
        this.setState({currentTeam : team, lines : lines, playersAvailable : players})
        console.log(this.state)
    }

    render() {
        return (
        //<View style={styles.container}>
        <View style={{flex: 1}}>        
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
                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>{this.state.currentTeamName}</Text>
                        <Text>{this.state.game.teamScore}</Text>
                        <Icon
                            raised
                            name='add'
                            color='#f50'
                            onPress={() => console.log('add')} />
                    </View>  
                    <View style={{flex: 0.5, alignItems: 'center',  justifyContent: 'center'}}>
                        <Text>{this.state.game.opponent}</Text>
                        <Text>{this.state.game.oppScore}</Text>
                        <Icon
                            //containerStyle={{marginLeft: 50}}
                            raised
                            name='add'
                            color='#f50'
                            onPress={() => console.log('add')} />
                    </View>                      
                </View>

                <View style={[styles.button, {marginTop: 10}]}>
                    <Button
                        raised
                        buttonStyle={[{backgroundColor: '#02968A'}]}
                        textStyle={{textAlign: 'center'}}
                        title={`Start Point`}
                        //onPress={() => this.saveAndStartGame()}
                        //disabled={!this.teamIsValid()}
                    />
                </View>


                    <Divider style={{ backgroundColor: 'black'}} />
                    <PlayerSelector 
                        playersSelected={this.state.playersSelected}
                        playersAvailable={this.state.playersAvailable}
                        updatePlayers={this.updatePlayers.bind(this)}
                    />    

                    <Divider style={{ backgroundColor: 'black'}} />
                    <View>
                        <Button
                            raised
                            buttonStyle={[{backgroundColor: '#02968A'}]}
                            textStyle={{textAlign: 'center'}}
                            title={`Choose Line`}
                            onPress={() => this._showModal()}
                            //disabled={!this.teamIsValid()}
                        />
                        <Modal style={styles.bottomModal} backdropColor={'white'} backdropOpacity={0.7}
                            isVisible={this.state.isModalVisible} onBackdropPress={() => this._hideModal()}>
                            <View>
                                <Picker
                                    selectedValue={this.state.lineSelectedIndex}
                                    onValueChange={(itemValue, itemIndex) => this.updateLineShown(itemIndex)}>
                                    {this.state.lines.map((line, index) => {
                                        return (
                                            <Picker.Item label={line.name} value={index} key={index}/>
                                        ) 
                                    })}
                                </Picker>
                                <Button
                                    raised
                                    buttonStyle={[{backgroundColor: '#02968A'}]}
                                    textStyle={{textAlign: 'center'}}
                                    title={`Close`}
                                    onPress={() => this._hideModal()}
                                    //disabled={!this.teamIsValid()}
                                />
                            </View>
                        </Modal>
                    </View>
                    
                        
            </View>
        </View>
        );
    }

    _showModal = () => this.setState({ isModalVisible: true })
    
    _hideModal = () => this.setState({ isModalVisible: false })

    updateLineShown(itemIndex) {
        //Remove players that have already been selected from the playersAvailable
        let playersInSelectedLine = this.state.lines[itemIndex].players,
            playersSelected = this.state.playersSelected.slice()

        var filteredPlayers = playersInSelectedLine.filter((player) => {
            if (playersSelected.indexOf(player) < 0) {
                return player
            }
        })

        this.setState({lineSelectedIndex: itemIndex})
        this.setState({playersAvailable : filteredPlayers})
    }

    updatePlayers(currentPlayersAvailable, currentPlayersSelected) {
        this.setState({playersAvailable : currentPlayersAvailable})
        this.setState({playersSelected: currentPlayersSelected})
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
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});

