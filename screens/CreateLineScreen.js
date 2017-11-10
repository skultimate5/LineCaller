import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Header } from 'react-native-elements'; 

export class CreateLineScreen extends React.Component {
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
        console.log(this.state.team)
    }

    render() {
        return (
        <View>
            <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                centerComponent={{ text: 'Create Line', style: { color: '#fff', fontSize:20 } }} 
                rightComponent={{
                    icon: 'home',
                    color: '#fff',
                    onPress: () => this.props.navigation.navigate('Home'),
                }}
            />
            <View>
                <Text> Create Line Screen </Text>
            </View>
        </View>
        );

    }
}

const styles = StyleSheet.create({

});

