import React from 'react';
import { Alert, Picker, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, ButtonGroup, Divider, FormLabel, FormInput, Header, Icon, List, ListItem } from 'react-native-elements';
import Modal from 'react-native-modal'



import LocalStorage from '../storage/LocalStorage.js';
import PlayerSelector from '../components/playerSelector'


export class TestDuringPointScreen extends React.Component {
    //This removes the react-navigation header
    static navigationOptions = {
        title: 'Home',
        headerLeft : null,
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            game : {teamScore: 0, oppScore: 0, opponent: 'test'},
            currentTeamName : 'Current Team',
            playersSelected : ['amelia', 'bob', 'carolyn', 'danielle', 'eric', 'felisha', 'grover'],
            playing : true,
            onD : true,
            oOrDWord : 'Defense'
        }

        this.state.LocalStorage = new LocalStorage()
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
                    //onPress: () => this.askToFinishGame(),
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
                            /*onPress={() => this.pointScored('currentTeam')}*/ /> }
                    </View>  
                    <View style={{flex: 0.5, alignItems: 'center',  justifyContent: 'center'}}>
                        <Text>{this.state.game.opponent}</Text>
                        <Text>{this.state.game.oppScore}</Text>
                        {this.state.playing && <Icon
                            //containerStyle={{marginLeft: 50}}
                            raised
                            name='add'
                            color='#f50'
                            /*onPress={() => this.pointScored('oppTeam')} */ /> }
                    </View>                      
                </View>

                {this.state.playing &&
                    <View style={{flex : 1}}>
                        <ScrollView>
                            <List>
                                {
                                    this.state.playersSelected.map((player, i) => (
                                        <View style={{flex: 1, flexDirection:'row'}} key={i}>
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
                                                        textStyle={{textAlign: 'center', fontSize: 15}}
                                                        title={`G`}
                                                        onPress={() => this.addPlayerGoal(i)}                    
                                                    />
                                                </View>
                                                <View style={styles.button}>
                                                    <Button
                                                        raised
                                                        buttonStyle={[{backgroundColor: '#8BC24A'}]}
                                                        textStyle={{textAlign: 'center', fontSize: 15}}
                                                        title={`A`}
                                                        onPress={() => this.addPlayerAssist(i)}                    
                                                    />
                                                </View>
                                                <View style={styles.button}>
                                                    <Button
                                                        raised
                                                        buttonStyle={[{backgroundColor: '#9C28B0'}]}
                                                        textStyle={{textAlign: 'center', fontSize: 15}}
                                                        title={`D`}
                                                        onPress={() => this.addPlayerD(i)}                    
                                                    />
                                                </View>
                                                <View style={styles.button}>
                                                    <Button
                                                        raised
                                                        buttonStyle={[{backgroundColor: '#02968A'}]}
                                                        textStyle={{textAlign: 'center', fontSize: 15}}
                                                        title={`T`}
                                                        onPress={() => this.addPlayerTurn(i)}                    
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

                
            </View>
        </View>
        );
    }

    addPlayerGoal(i) {
        console.log(`Goal ${i}`)
    }

    addPlayerAssist(i) {
        console.log(`Assist ${i}`)
    }

    addPlayerD(i) {
        console.log(`D ${i}`)
    }

    addPlayerTurn(i) {
        console.log(`Turn ${i}`)
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


