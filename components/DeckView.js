import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { getDeck, removeEntry } from '../utils/api'
import { gray, lightPurp, orange, white, purple, blue } from '../utils/colors'
import { connect } from 'react-redux'
import ActionButton from './ActionButton'
import { Entypo } from '@expo/vector-icons'

class DeckView extends Component {


	removeDeck = (item) => {
		removeEntry(item)
		removeDeck(item)
		this.props.navigation.navigate('DeckList')
	}

	 getCardsLength = (questions) => {
	    if(questions.length === 0) {
	      return <Text>0 cards</Text>
	    }else if(questions.length > 1){
	      return <Text>{questions.length} cards</Text>
	    }else {
	      return <Text>1 card</Text>
	    }
	}

  	render(){
  		const deck = this.props.navigation.state.params.entryId
  		const { decks } = this.props
  		const cards = decks[deck].questions

  		return (
	      <View style={styles.container}>
	        <View style={styles.card}>
	        	<Text style={styles.mainText}>{deck}</Text>
	            <Text style={styles.subText}>{cards ? this.getCardsLength(cards) : null}</Text>	        	 
	        	<ActionButton styles={styles} text={'Add Card'} color={blue} onPress={() => this.props.navigation.navigate('AddCard', { entryId: deck })}/>
	        	<ActionButton styles={styles} text={'Start Quiz'} color={lightPurp} onPress={() => this.props.navigation.navigate('Quiz', { entryId: deck })}/>
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

	card: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		backgroundColor: orange,
		alignSelf: 'stretch'
	},
	mainText: {
		fontSize: 40,
		color: white,
	},
	subText: {
		fontSize: 30,
		color: white,
		marginBottom: 160
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
    fontSize: 22,
    textAlign: 'center'
  },
})

function mapStateToProps(decks){
	return {
		decks
	}
}

export default connect(mapStateToProps)(DeckView)