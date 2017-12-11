import React from 'react';
import { Component } from 'react';

import { Animated, Easing, Image, Dimensions, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Header, List, ListItem } from 'react-native-elements'; 

import LocalStorage from '../storage/LocalStorage';
import SortableList from 'react-native-sortable-list';

const window = Dimensions.get('window');

export class ReorderPlayersScreen extends React.Component {
    //This removes the react-navigation header
    static navigationOptions = {
        title: 'Home',
        headerLeft : null,
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
        }
        this.state.LocalStorage = new LocalStorage()
    }

    _renderRow = ({data, active}) => {
        return <Row data={data} active={active} />
    }

    render() {
        const data = {
            0: {
              image: 'https://placekitten.com/200/240',
              text: 'Chloe',
            },
            1: {
              image: 'https://placekitten.com/200/201',
              text: 'Jasper',
            },
            2: {
              image: 'https://placekitten.com/200/202',
              text: 'Pepper',
            },
            3: {
              image: 'https://placekitten.com/200/203',
              text: 'Oscar',
            },
            4: {
              image: 'https://placekitten.com/200/204',
              text: 'Dusty',
            },
            5: {
              image: 'https://placekitten.com/200/205',
              text: 'Spooky',
            },
            6: {
              image: 'https://placekitten.com/200/210',
              text: 'Kiki',
            },
            7: {
              image: 'https://placekitten.com/200/215',
              text: 'Smokey',
            },
            8: {
              image: 'https://placekitten.com/200/220',
              text: 'Gizmo',
            },
            9: {
              image: 'https://placekitten.com/220/239',
              text: 'Kitty',
            },
          };
        return (
        <View style={{flex : 1}}>
            <Header
                outerContainerStyles={{ backgroundColor: '#3D6DCC', zIndex: 1 }}
                leftComponent={{
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => this.props.navigation.goBack(),
                }}
                centerComponent={{ text: 'Reorder Players', style: { color: '#fff', fontSize:20 } }} 
            />
           
            <SortableList
                style={styles.list}
                contentContainerStyle={styles.contentContainer}
                data={data}
                renderRow={this._renderRow} />

            <View style={{marginTop: 10}}>
                <Button
                    raised
                    buttonStyle={[{backgroundColor: '#02968A'}]}
                    textStyle={{textAlign: 'center'}}
                    title={`Save`}
                    onPress={() => this.saveLine()}
                />
            </View>
        </View>
        );
    }

    saveLine() {
        console.log(this.state);
        // if (!this.state.lineName) {
        //     console.log("what the fuck dude")
        // }

        // let currentTeam = Object.assign({}, this.state.team)

        // let sameIndex = -1,
        //     error = false

        // currentTeam.lines.forEach((line, i) => {
        //     if (this.state.lineName === line.name) {
        //         if (this.state.fromLineDetailScreen) {
        //             sameIndex = i
        //         }
        //         else {
        //             error = true
        //             this.setState({sameNameError : true})
        //         }
        //     }
        // })

        // //Checking if need to update instead of add new line
        // if (!error && !this.state.fromLineDetailScreen) {
        //     currentTeam.lines.push({name: this.state.lineName, players: this.state.playersSelected})
        //     this.state.LocalStorage.setTeam(currentTeam.name, currentTeam)
        //     this.props.navigation.navigate('ViewLines', {currentTeamName : currentTeam.name, fromHomeScreen: false})
        // }
        // else if (!error && this.state.fromLineDetailScreen) {
        //     currentTeam.lines[sameIndex] = {name : this.state.lineName, players: this.state.playersSelected}     
        //     this.state.LocalStorage.setTeam(currentTeam.name, currentTeam)
        //     this.props.navigation.navigate('ViewLines', {currentTeamName : currentTeam.name, fromHomeScreen: false})
        // }
    }
}

class Row extends Component {
    
      constructor(props) {
        super(props);
    
        this._active = new Animated.Value(0);
    
        this._style = {
          ...Platform.select({
            ios: {
              transform: [{
                scale: this._active.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.1],
                }),
              }],
              shadowRadius: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [2, 10],
              }),
            },
    
            android: {
              transform: [{
                scale: this._active.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.07],
                }),
              }],
              elevation: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [2, 6],
              }),
            },
          })
        };
      }
    
      componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
          Animated.timing(this._active, {
            duration: 300,
            easing: Easing.bounce,
            toValue: Number(nextProps.active),
          }).start();
        }
      }
    
      render() {
       const {data, active} = this.props;
    
        return (
          <Animated.View >
            <Text>{data.text}</Text>
          </Animated.View>
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
    },
    title: {
        fontSize: 20,
        paddingVertical: 20,
        color: '#999999',
      },
    
      list: {
        flex: 1,
      },
    
      contentContainer: {
        width: window.width,
    
        ...Platform.select({
          ios: {
            paddingHorizontal: 30,
          },
    
          android: {
            paddingHorizontal: 0,
          }
        })
      },
    
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 4,
    
    
        ...Platform.select({
          ios: {
            width: window.width - 30 * 2,
            shadowColor: 'rgba(0,0,0,0.2)',
            shadowOpacity: 1,
            shadowOffset: {height: 2, width: 2},
            shadowRadius: 2,
          },
    
          android: {
            width: window.width - 30 * 2,
            elevation: 0,
            marginHorizontal: 30,
          },
        })
      },
    
      image: {
        width: 50,
        height: 50,
        marginRight: 30,
        borderRadius: 25,
      },
    
      text: {
        fontSize: 24,
        color: '#222222',
      },
});

