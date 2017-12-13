import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';


export default class ReorderHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {navigation, playersSelected, lineName, team, fromLineDetailScreen} = this.props
    
        return (
            <Button 
                raised
                title='Reorder'
                onPress={() => {
                    if (fromLineDetailScreen) {
                        navigation.navigate('ReorderPlayers', {playersSelected, lineName, team, fromLineDetailScreen})
                    }
                    else {
                        navigation.navigate('ReorderPlayers', {playersSelected, team, fromLineDetailScreen})
                    }
                }}/>
        );
    }
}