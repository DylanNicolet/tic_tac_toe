import React from "react";
import "App.css";

export default function App(){
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
            [gameState[key]]: gameState[key] += "o"
          }))
        }
      }
    }

    

    e.target.style.pointerEvents = "none"

    setPlayer1(previous => !previous)
    console.log(gameState)
  }

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
    </section>
  )
}
