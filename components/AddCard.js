import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'	    
import { gray, lightPurp, orange, white, red } from '../utils/colors'
import { SubmitBtn } from './SubmitBtn'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'

import { StyleSheet, 
	     Text,
	     View,
	     TouchableOpacity,
	     TextInput,
	     KeyboardAvoidingView } from 'react-native'

class AddCard extends React.Component {

	state = {
		question: '',
		answer: '',
		correctAnswer: ''
	}

	submitCard = (deck) => {

		const { question, answer, correctAnswer } = this.state
		this.props.dispatch(addCard({question, answer, deck, correctAnswer}))		
		addCardToDeck(deck, {question, answer, correctAnswer} )
		this.setState({ question: '', answer: '', correctAnswer: ''})
		this.props.navigation.dispatch(NavigationActions.back({ key: null }))

	}

	render(){
		const deckName = this.props.navigation.state.params.entryId
		
		return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>		
			<View style={styles.container}>
				<Text style={styles.title}>What is the question?</Text>
			       <TextInput
			        style={styles.input}
			        onChangeText={(question) => this.setState({ question })}
			        value={this.state.question}
			      />
			      <Text style={styles.title}>Display answer?</Text>
			       <TextInput
			        style={styles.input}
			        onChangeText={(answer) => this.setState({ answer })}
			        value={this.state.answer}
			      />
			       <Text style={styles.title}>True or False?</Text>
			       <TextInput
			        style={styles.input}
			        onChangeText={(correctAnswer) => this.setState({ correctAnswer })}
			        value={this.state.correctAnswer}
			      />
   				 <SubmitBtn style={styles.submitBtn} onPress={() => this.submitCard(deckName)}/> 
			</View>
		</KeyboardAvoidingView>	
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',

	},
	submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
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
    input: {
		  width: 250,
		  height: 40,
		  padding: 8,
		  borderWidth: 1,
		  borderColor: '#757575',
		  margin: 20
	},
})

export default connect()(AddCard)