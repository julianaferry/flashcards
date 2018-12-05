import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { gray, lightPurp, orange, white } from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { SubmitBtn } from './SubmitBtn'


class AddDeck  extends Component {
	state = {
		text: ''
	}
		

submitName = () => {
	const { text } = this.state

	saveDeckTitle(text)	
	this.props.dispatch(addDeck(text))
	this.props.navigation.navigate('DeckView',{ entryId: text })
	this.setState({
		text: ''
	})

}

  render(){
    return (
      <View style={styles.container}>
      	<Text style={styles.title}>New Deck's Name?</Text>
      		 <TextInput
       			 style={styles.input}
        		 onChangeText={(text) => this.setState({ text })}
                 value={this.state.text}
             />
        	 <SubmitBtn style={styles.submitBtn} onPress={this.submitName}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		width: 200,
		height: 44,
		padding: 8,
		borderWidth: 1,
		borderColor: '#757575',
		margin: 50
	},
	title: {
		fontSize: 30,
		color: '#333',
	},
	submitBtn: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 8,
        backgroundColor: orange,
        borderRadius: 7,
        overflow: 'hidden'
	},
	submitBtnText: {
	    color: white,
	    fontSize: 22,
	    textAlign: 'center'
  },
})


export default connect()(AddDeck)




