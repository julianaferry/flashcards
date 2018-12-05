import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { gray, lightPurp, orange, white, purple, blue, red, green } from '../utils/colors'
import { SubmitBtn } from './SubmitBtn'
import { connect } from 'react-redux'
import ActionButton from './ActionButton'


export function Info({ onPress, style, text }){
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={style}>{text}</Text>
		</TouchableOpacity>
	)
}

class Quiz extends Component {

	state = {
		questionNumber: 0, 
		showQuestion: false,
		correct: 0,
		incorrect: 0
	}

	showAnswer = () => (
		!this.state.showQuestion ? this.setState({ showQuestion: true }) 
		: this.setState({ showQuestion: false })
	)

	submitAnswer = (answer) => {
		
		const { questionNumber } = this.state
		const deck = this.props.navigation.state.params.entryId
		const decks = this.props.decks
		const correct = decks[deck].questions[questionNumber].correctAnswer.toLowerCase()
		
		
		if(answer.trim() === correct.trim()){
			this.setState({ correct: this.state.correct + 1 })
		}else {
			this.setState({ incorrect: this.state.correct + 1 })
		}
		this.setState({ questionNumber: this.state.questionNumber + 1, showQuestion: false })
		
	}

	replayQuiz = () => {

		this.setState({
			questionNumber: 0, 
			showQuestion: false,
			correct: 0,
			incorrect: 0
		})
	}

	goBack = () => {
		this.props.navigation.dispatch(NavigationActions.back({ key: null }))
	}



	render(){
		const { questionNumber } = this.state
		const decks = this.props.decks
		const deck = this.props.navigation.state.params.entryId
		const number = this.state.questionNumber + 1

		if(questionNumber === decks[deck].questions.length){
			return (
				<View style={styles.container}>
					<View style={styles.card}>
						<Text style={styles.mainText}>You got {this.state.correct} out of {decks[deck].questions.length}</Text>
						<View>
							<ActionButton styles={styles} text={'Try again!'} color={green} onPress={this.replayQuiz}/>
				        	<ActionButton styles={styles} text={'Back to Deck'} color={red} onPress={this.goBack}/>
						</View>
					</View>
				</View>
			)
		}
		return(
			<View style={styles.container}>
				<View style={styles.card}>
				<Text style={styles.questions}>{number} / {decks[deck].questions.length}</Text>					
					{!this.state.showQuestion ? <Text style={styles.mainText}>{decks[deck].questions[questionNumber].question}</Text>
					: <Text style={styles.mainText}>{decks[deck].questions[questionNumber].answer}</Text>}

					{!this.state.showQuestion ? <Info text={"Show Answer"} style={styles.answer} onPress={this.showAnswer}/>
					: <Info text={"Show Question"} style={styles.answer} onPress={this.showAnswer}/>}
										
				<View>
					<ActionButton styles={styles} text={'Correct'} color={green} onPress={() => this.submitAnswer('true')}/>
		        	<ActionButton styles={styles} text={'Incorrect'} color={red} onPress={() => this.submitAnswer('false')}/>
				</View>
				</View>
			</View>
		)
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 5,
    width: 160  
  },
    submitBtnText: {
    color: white,
    fontSize: 26,
    textAlign: 'center',
  },
  questions: {
  	top: 0,
  	alignSelf: 'flex-start',
  	left: 0,
  	top: 0,
  	color: white,
  	fontSize: 20,
  	margin: 5,
  	position: 'absolute',

  },
  answer: {
  	color: white,
  	fontSize: 20,
  	margin: 20,
  },
  card: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		margin: 10,
		backgroundColor: orange,
		alignSelf: 'stretch',
		
	},
	mainText: {
		fontSize: 40,
		color: white,
		marginTop: 40,
		textAlign: 'center'
		
	},
})

function mapStateToProps(decks){
	return {
		decks
	}
}

export default connect(mapStateToProps)(Quiz)