import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Divider, FormLabel, FormInput, Header, List, ListItem } from 'react-native-elements'; 

import LocalStorage from '../storage/LocalStorage';
import PlayerSelector from '../components/playerSelector'

export class TeamDetailScreen extends React.Component {
    //This removes the react-navigation header
    static navigationOptions = {
        title: 'Home',
        headerLeft : null,
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            team: props.navigation.state.params.team
        }

        this.state.LocalStorage = new LocalStorage()
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
                centerComponent={{ text: this.state.team.name, style: { color: '#fff', fontSize:20 } }} 
                rightComponent={{
                    icon: 'edit',
                    color: '#fff',
                    //onPress: () => this.props.navigation.navigate('CreateLine', {playersAvailable : this.state.playersAvailable, playersSelected : this.state.playersSelected, line : this.state.line, team : this.state.team, fromLineDetailScreen : true}),
                    
                }}
            />
            <View style={{flex : 1}}>
                <ScrollView>
                    <List>
                        {
                            this.state.team.players.map((player, i) => (
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
                        onPress={() => this.deleteTeam()}
                    />
                </View>
            </View>
        </View>
        );
    }

    deleteTeam() {
        // let index = -1,
        //     currentTeam = Object.assign({}, this.state.team)

        // currentTeam.lines.forEach((line, i) => {
        //     if (this.state.line.name === line.name) {
        //         index = i
        //     }
        // })

        // currentTeam.lines.splice(index, 1)    
        // this.state.LocalStorage.setTeam(currentTeam.name, currentTeam)
        // this.props.navigation.navigate('ViewLines', {currentTeamName : currentTeam.name})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    halfWidth: {
        flex: .5
    },
    button: {
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 25
    }
});

