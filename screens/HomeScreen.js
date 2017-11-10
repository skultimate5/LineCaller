import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Header } from 'react-native-elements'; 

export class HomeScreen extends React.Component {
    //This rooms the reacet-navigation header
    static navigationOptions = {
        title: 'Home',
        headerLeft : null,
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            hasStoredTeam : false
        }
    }

    render() {
        return (
        <View>
            <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                centerComponent={{ text: 'Home', style: { color: '#fff', fontSize:20 } }} 
            />
            <View>
                <Button
                    raised
                    icon={{name : 'people'}}
                    buttonStyle={[{backgroundColor: '#02968A'}, styles.button]}
                    textStyle={{textAlign: 'center'}}
                    title={`Create Team`}
                    onPress={() => console.log("hi")}//navigate('TrackScore')}
                />
            </View>
        </View>
        );

    }
}

const styles = StyleSheet.create({

});

