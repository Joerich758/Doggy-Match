import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/dog-1.jpg", matched: false },
  { "src": "/img/dog-2.jpg", matched: false },
  { "src": "/img/dog-3.jpg", matched: false },
  { "src": "/img/dog-4.jpg", matched: false },
  { "src": "/img/dog-5.jpg", matched: false },
  { "src": "/img/dog-6.jpg", matched: false },
]
/* Create an array of cards whereby each card item in that array points to a specific image source that we have in the public folder */

function App() {
   // Store cards for a particular game
   const [cards, setCards] = useState([])
   const [turns, setTurns] = useState(0)
   const [choiceOne, setChoiceOne] = useState(null)
   const [choiceTwo, setChoiceTwo] = useState(null)
   const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] 
      .sort(() => Math.random() - 0.5) 
      //Executes a function for each item or pair of items in the array. If we return a number less than 0, the order of the two items stays the same, if its greater than 0, then it's swapped.
    // Math.random will randomly select a number between 0 and 1
      .map((card) => ({ ...card, id: Math.random() }))
    // Execute a function for each item in this new sorted array, add an id to each item, and return an object for each case

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automagically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
    <h1>Doggy Match</h1>
    <p>By Joe</p>
    <button onClick={shuffleCards}>New Game</button>

    <div className="card-grid">
      {cards.map(card => (
        <SingleCard 
        key={card.id} 
        card={card}
        handleChoice={handleChoice} 
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
        />
      ))}
    </div>
    <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
