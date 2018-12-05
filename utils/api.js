import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'flashcards: decks'

const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
      {
        question: 'What is varibale',
        answer: 'Something that stores information.'
      }
    ]
  },
  Redux: {
    title: 'Redux',
    questions: [
      {
        question: 'What is Redux?',
        answer: 'A library for styling user interfaces'
      },
      {
        question: 'What does a reducer do?',
        answer: 'Reduces data'
      }
    ]
  }
}

export function saveDeckTitle(title){
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    	[title]: {
    		title: title,
    		questions: []
    	}
    }))
  }

 export function getDecks (deck) {
 	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
 	.then(results => {
 		if(results === null) {
 			AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData))
 			return initialData
 		}else {
 			return JSON.parse(results)
 		}
 	})
	
  }

export function addCardToDeck (name, card) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then(results => JSON.parse(results))
  .then(results => {
    results[name].questions.push(card)
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results))
      return results
  })
}

export function removeEntry (key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    data[key] = undefined
    delete data[key]
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
  }





















