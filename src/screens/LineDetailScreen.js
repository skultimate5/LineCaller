import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Divider, FormLabel, FormInput, Header, List, ListItem } from 'react-native-elements'; 

import LocalStorage from '../storage/LocalStorage';

export class LineDetailScreen extends React.Component {
    //This removes the react-navigation header
    static navigationOptions = {
        title: 'Home',
        headerLeft : null,
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            line: props.navigation.state.params.line
        }

        this.state.LocalStorage = new LocalStorage()
    }

    render() {
        return (
        <View style={{flex : 1}}>
            <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                leftComponent={{
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => this.props.navigation.goBack(),
                }}
                centerComponent={{ text: 'Name of Line', style: { color: '#fff', fontSize:20 } }} 
                rightComponent={{
                    icon: 'edit',
                    color: '#fff',
                    onPress: () => console.log('Edit Line'),
                }}
            />
            <View >
                <ScrollView>
                    <Text>{this.state.line.name}</Text>
                    <List>
                        {
                            this.state.line.players.map((player, i) => (
                                <ListItem
                                    key={i}
                                    title={player}
                                    hideChevron={true}
                                />
                            ))
                        }
                    </List>
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

