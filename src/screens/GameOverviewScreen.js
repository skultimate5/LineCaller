import React from 'react';
import { Alert, Picker, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, ButtonGroup, Divider, FormLabel, FormInput, Header, Icon, List, ListItem } from 'react-native-elements';
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

        this.state = {
            game : props.navigation.state.params.game,
            currentTeamName : props.navigation.state.params.currentTeamName,
            playersSelected : [],
            playersAvailable : [],
            lines : [],
            currentTeam: {},
            lineSelectedIndex : 0,
            isModalVisible : false,
            playing : false,
            onD : props.navigation.state.params.game.startedOn == 'D' ? true : false,
            oOrDWord : props.navigation.state.params.game.startedOn == 'D' ? 'Defense' : 'Offense',
            playerStats: {}
        }

        this.state.LocalStorage = new LocalStorage()
    }

    componentWillMount() {
        this.getTeam()
    }

    async getTeam() {
        let team = await this.state.LocalStorage.getTeam(this.state.currentTeamName),
            lines = team.lines.slice(),
            players = team.players,
            playerStats = {}
            
        //put All players in first index of lines array
        lines.unshift({name : 'All', players : players})

        players.forEach((player) => {
            let key = player.toString()

            playerStats[key] = {
                playingTime: 0,
                goals: 0,
                assists: 0,
                ds: 0,
                turns: 0
            }
        })

        this.setState({currentTeam : team, lines : lines, playersAvailable : players, playerStats : playerStats})
    }

    render() {
        return (
        //<View style={styles.container}>
        <View style={{flex: 1}}>        
            {this.state.oOrDWord && <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                leftComponent={{
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => this.props.navigation.goBack(),
                }}
                centerComponent={{ text: `Playing ${this.state.oOrDWord}`, style: { color: '#fff', fontSize:20 } }} 
                rightComponent={{
                    icon: 'done',
                    color: '#fff',
                    onPress: () => this.askToFinishGame(),
                }}
            />}
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>{this.state.currentTeamName}</Text>
                        <Text>{this.state.game.teamScore}</Text>
                        {this.state.playing && <Icon
                            raised
                            name='add'
                            color='#f50'
                            onPress={() => this.pointScored('currentTeam')} /> }
                    </View>  
                    <View style={{flex: 0.5, alignItems: 'center',  justifyContent: 'center'}}>
                        <Text>{this.state.game.opponent}</Text>
                        <Text>{this.state.game.oppScore}</Text>
                        {this.state.playing && <Icon
                            //containerStyle={{marginLeft: 50}}
                            raised
                            name='add'
                            color='#f50'
                            onPress={() => this.pointScored('oppTeam')} /> }
                    </View>                      
                </View>

                {this.state.playing &&
                    <View style={{flex : 1}}>
                        <ScrollView>
                            <List>
                                {
                                    this.state.playersSelected.map((player, i) => (
                                        <View style={{flex: 1, flexDirection:'row', height: 65}} key={i}>
                                            <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
                                                {/* <ListItem
                                                    title={player}
                                                    hideChevron={true}
                                                    //onPress={() => {this.removePlayer(player, playersAvailable, playersSelected, updatePlayers)}}
                                                /> */}
                                                <Text style={{textAlign:'center', fontSize: 15}}>{player}</Text>
                                            </View>
                                            <View style={{flex: 0.7, flexDirection: 'row'}}   >
                                                <View style={styles.button}>
                                                    <Button
                                                        raised
                                                        buttonStyle={[{backgroundColor: '#2095F2'}]}
                                                        textStyle={{textAlign: 'center', fontSize: 12}}
                                                        title={`G`}
                                                        onPress={() => this.addPlayerGoal(player)}                    
                                                    />
                                                </View>
                                                <View style={styles.button}>
                                                    <Button
                                                        raised
                                                        buttonStyle={[{backgroundColor: '#8BC24A'}]}
                                                        textStyle={{textAlign: 'center', fontSize: 12}}
                                                        title={`A`}
                                                        onPress={() => this.addPlayerAssist(player)}                    
                                                    />
                                                </View>
                                                <View style={styles.button}>
                                                    <Button
                                                        raised
                                                        buttonStyle={[{backgroundColor: '#9C28B0'}]}
                                                        textStyle={{textAlign: 'center', fontSize: 12}}
                                                        title={`D`}
                                                        onPress={() => this.addPlayerD(player)}                    
                                                    />
                                                </View>
                                                <View style={styles.button}>
                                                    <Button
                                                        raised
                                                        buttonStyle={[{backgroundColor: '#02968A'}]}
                                                        textStyle={{textAlign: 'center', fontSize: 12}}
                                                        title={`T`}
                                                        onPress={() => this.addPlayerTurn(player)}                    
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </List>
                        </ScrollView>
                    </View>
                }

                {!this.state.playing && 
                <View style={{flex : 1}}>
                    <View style={[styles.button, {marginTop: 10}]}>
                        <Button
                            raised
                            buttonStyle={[{backgroundColor: '#02968A'}]}
                            textStyle={{textAlign: 'center'}}
                            title={`Start Point`}
                            onPress={() => this._startPlaying()}
                            disabled={!this.validPlayers()}
                        />
                    </View>


                    <Divider style={{ backgroundColor: 'black'}} />
                    <PlayerSelector 
                        playersSelected={this.state.playersSelected}
                        playersAvailable={this.state.playersAvailable}
                        updatePlayers={this.updatePlayers.bind(this)}
                        showPlayingTime={true}
                        playerStats={this.state.playerStats}
                    />    

                    <Divider style={{ backgroundColor: 'black'}} />
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Button
                                raised
                                buttonStyle={[{backgroundColor: '#02968A'}]}
                                textStyle={{textAlign: 'center'}}
                                title={`Choose Line`}
                                onPress={() => this._showModal()}
                            />
                            {this.state.lines[this.state.lineSelectedIndex] && <Text>{this.state.lines[this.state.lineSelectedIndex].name} Selected</Text>}
                        </View>
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
                                />
                            </View>
                        </Modal>
                    </View>
                </View>} 
            </View>
        </View>
        );
    }

    addPlayerGoal(player) {
        let playerStats = this.state.playerStats,
            key = player.toString()

        playerStats[key].goals = playerStats[key].goals + 1

        this.setState({playerStats})

        console.log(`Goal ${player}`)
    }

    addPlayerAssist(player) {
        let playerStats = this.state.playerStats,
            key = player.toString()

        playerStats[key].assists = playerStats[key].assists + 1

        this.setState({playerStats})
        console.log(`Assist ${player}`)
    }

    addPlayerD(player) {
        let playerStats = this.state.playerStats,
            key = player.toString()

        playerStats[key].ds = playerStats[key].ds + 1

        this.setState({playerStats})
        console.log(`D ${player}`)
    }

    addPlayerTurn(player) {
        let playerStats = this.state.playerStats,
            key = player.toString()

        playerStats[key].turns = playerStats[key].turns + 1

        this.setState({playerStats})
        console.log(`Turn ${player}`)
    }

    askToFinishGame() {
        Alert.alert(
            'Finish the Game?',
            '',
            [
              {text: 'Yes', onPress: () => this.finishGame()},
              {text: 'No', onPress: () => console.log('No')},
            ],
            { cancelable: false }
        )
    }

    finishGame() {
        //Add current game to this team object

        let team = Object.assign({}, this.state.currentTeam),
            game = Object.assign({}, this.state.game)

        game.endingTimestamp = new Date()
        game.playerStats = this.state.playerStats
        team.games.push(game)
        this.state.LocalStorage.setTeam(team.name, team)
        this.state.LocalStorage.removeCurrentGame()

        this.props.navigation.navigate('Home', {team : team, players: team.players, fromCreateTeam: true})        
    }

    _startPlaying() {
        this.setState({playing : true})
    }

    pointScored(team) {
        let game = Object.assign({}, this.state.game),
            line = {
                name: this.state.lines[this.state.lineSelectedIndex].name, 
                players: [this.state.playersSelected], 
                onD: this.state.onD, 
                scored: team == 'currentTeam' ? true : false
            }
        
        team == 'currentTeam' ? game.teamScore++ : game.oppScore++
        game.lines.push(line)

        let onD = team == 'currentTeam' ? true : false
        let oOrDWord = onD ? 'Defense' : 'Offense'

        let playersSelected = this.state.playersSelected.slice(),
            playerStats = this.state.playerStats

        playersSelected.forEach((player) => {
            let key = player.toString()

            playerStats[key].playingTime = playerStats[key].playingTime + 1
        })

        console.log(playerStats)

        this.setState({game, onD, oOrDWord, playerStats, playersSelected: [], lineSelectedIndex: 0, playersAvailable: this.state.currentTeam.players, playing: false})
        this.state.LocalStorage.setCurrentGame(game)
    }

    validPlayers() {
        return this.state.playersSelected.length == 7
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

