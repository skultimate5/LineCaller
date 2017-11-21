import React, { Component } from 'react';
import { Modal, TouchableWithoutFeedback, Text, StyleSheet, Platform, View, Picker, TextInput, TouchableOpacity } from 'react-native';

export default class FormPicker extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modalVisible: false,
      };
    }
  
    render() {
      if (Platform.OS === 'android') {
        return (
          <Picker
            selectedValue={this.props.value}
            onValueChange={this.props.onValueChange}>
            {this.props.items.map((i, index) => (
              <Picker.Item key={index}
                          label={i.name}
                          value={index} />
            ))}
          </Picker>
        );
      } else {
        const selectedItem = this.props.items.find(
          i => i.value === this.props.value
        );
        const selectedLabel = selectedItem ? selectedItem.label : '';
        return (
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ modalVisible: true })}>
              <Text>Choose Line</Text>
            </TouchableOpacity>
            <Modal
              transparent={true}
              visible={this.state.modalVisible}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({ modalVisible: false })}>
                <View style={styles.modalContainer}>
                  <View style={styles.buttonContainer}>
                    <Text
                      style={{ color: 'blue' }}
                      onPress={() => this.setState({ modalVisible: false })}>
                      Done
                    </Text>
                  </View>
                  <View>
                    <Picker
                      selectedValue={this.props.value}
                      onValueChange={this.props.onValueChange}>
                      {this.props.items.map((i, index) => (
                        <Picker.Item
                          key={index}
                          label={i.name}
                          value={index}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        );
      }
    }
  }

const styles = StyleSheet.create({
    content: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    inputContainer: {
        ...Platform.select({
            ios: {
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            },
        }),
    },
    input: {
        height: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        padding: 4,
        backgroundColor: '#ececec',
    },
});