import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, ScrollView } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { getDecks, removeEntry } from '../utils/api'
import DeckView from './DeckView'
import { receiveDecks } from '../actions'
import { orange, white } from '../utils/colors'

function Deck ({ title, questions, item }) {
  return (
       <View key={item} style={styles.card}>   
          <Text style={styles.cardText}>{title}</Text>
              <Text style={styles.cardText}>{questions ? questions.length : 0} cards</Text>   
                  <Button
                      onPress={() => this.props.navigation.navigate(
                        'DeckView',
                        { entryId: item }
                        )}
                      title="Go to Deck View"
                  />
        </View>

    )
}



class DeckList extends React.Component {

  componentDidMount(){
    getDecks()
    .then(decks => this.props.recieveAllDecks(decks))
 
     const { decks } = this.props  
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

  render() {
   
   const {decks} = this.props
   
   if(decks){
     return (
      <ScrollView style={styles.container}>
        {Object.keys(decks).map((key) => {
          const { title, questions } = decks[key]

            return (
                <View key={key} style={styles.card}>   
                   <Text style={styles.cardText}>{title}</Text>
                      <Text style={styles.cardText}>{questions ? this.getCardsLength(questions) : null}</Text>   
                        <Button
                          onPress={() => this.props.navigation.navigate(
                            'DeckView',
                            { entryId: key }
                            )}
                          title="View Deck"
                        />
                </View>            
              )
            })}
         </ScrollView>
       )
     }
     return (
        <View>
            <Text>Loading...</Text>
        </View>
      )  
    }
  }


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch'
	},
	card: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: orange,
		margin: 2,
    height: 200,
	},
	cardText: {
		fontSize: 30,
		color: white

	}
})

function mapStateToProps(decks){
  return {
    decks,
  }
}

function mapDispatchToProps( dispatch ){
  return {
    recieveAllDecks: (decks) => dispatch(recieveDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)