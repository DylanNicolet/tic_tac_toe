import React from "react";
import "App.css";
import WinModal from "./WinModal";

export default function App(){
  //State management
    let [player1, setPlayer1] = React.useState(true)

    let [gameState, setGameState] = React.useState({
      row1:"",
      row2:"",
      row3:"",
      column1:"",
      column2:"",
      column3:"",
      diagonalToRight:"",
      diagonalToLeft:""
    })

    let [gameEnded, setGameEnded] = React.useState([false, ""])
  
  //function to handle player action and game states
    function handlePlayerChoice(e) {
      if(player1){
        e.target.innerHTML = "<span>x</span>"

        for (const key of Object.keys(gameState)) {
          if(e.target.className.includes(key.toString())){
            setGameState(previous => ({
              ...previous,
              [key]: gameState[key] += "x"
            }))
          }
        }
      }
      else {
        e.target.innerHTML = "<span>o<span>"

        for (const key of Object.keys(gameState)) {
          if(e.target.className.includes(key.toString())){
            setGameState(previous => ({
              ...previous,
              [key]: gameState[key] += "o"
            }))
          }
        }
      }

      e.target.style.pointerEvents = "none"

      setPlayer1(previous => !previous)
    }

  //useEffect hook to check for a winner everytime gameState changes
  React.useEffect(() => {
    setTimeout(() => {
      for (const key of Object.keys(gameState)) {
            if(gameState[key] === "xxx"){
              setGameEnded([true, "x"])
            }
            else if(gameState[key] === "ooo"){
              setGameEnded([true, "o"])
            }
          }
    }, 1300)
    
  }, [gameState])

  return(
    <section className="app">
      <main>
        <section className="game-board">
          <section className="input-container row1 column1 diagonalToRight" onClick={e => handlePlayerChoice(e)}></section>
          <section className="input-container row1 column2" onClick={e => handlePlayerChoice(e)}></section>
          <section className="input-container row1 column3 diagonalToLeft" onClick={e => handlePlayerChoice(e)}></section>
          <section className="input-container row2 column1" onClick={e => handlePlayerChoice(e)}></section>
          <section className="input-container row2 column2 diagonalToRight diagonalToLeft" onClick={e => handlePlayerChoice(e)}></section>
          <section className="input-container row2 column3" onClick={e => handlePlayerChoice(e)}></section>
          <section className="input-container row3 column1 diagonalToLeft" onClick={e => handlePlayerChoice(e)}></section>
          <section className="input-container row3 column2" onClick={e => handlePlayerChoice(e)}></section>
          <section className="input-container row3 column3 diagonalToRight" onClick={e => handlePlayerChoice(e)}></section>
        </section>
        <h1>{player1 ? "Player 1" : "Player 2"}</h1>
      </main>
      {gameEnded[0] && <WinModal winner={gameEnded[1]} />}
    </section>
  )
}
