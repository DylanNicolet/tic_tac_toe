import React from "react";
import "App.css";

export default function App(){
  //State management
    let [ xScore, setXScore ] = React.useState( localStorage.getItem( "xScore" ) ? Number( localStorage.getItem( "xScore" ) ) : 0 )
    let [ oScore, setOScore ] = React.useState( localStorage.getItem( "oScore" ) ? Number( localStorage.getItem( "oScore" ) ) : 0 )
    let [ tiesScore, setTiesScore ] = React.useState( localStorage.getItem( "tiesScore" ) ? Number( localStorage.getItem( "tiesScore" ) ) : 0 )

    let [ player1, setPlayer1 ] = React.useState( true )

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

    let [ gameEnded, setGameEnded ] = React.useState( [ false, "" ] )
  
  //function to handle player action and game states
    function handlePlayerChoice(e) {
      if(player1){
        e.target.innerHTML = "<span class='x-choice'>x</span>"

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
        e.target.innerHTML = "<span class='o-choice'>o<span>"

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
  
  //Function to force reload the page and thus reset the game  
    function handleResetGame() {
      window.location.reload(false)
    }
  
  //Function to reset scores on local storage
    function handleResetScore() {
      localStorage.setItem( "xScore", 0 )
      localStorage.setItem( "tiesScore", 0 )
      localStorage.setItem( "oScore", 0 )
      setXScore( 0 )
      setTiesScore( 0 )
      setOScore( 0 )
      setGameEnded( false, "" )
      window.location.reload(false)
    }

  //useEffect hook to check for a winner everytime gameState changes
    React.useEffect(() => {
      setTimeout(() => {
        for (const key of Object.keys(gameState)) {
          if(gameState[key] === "xxx"){
            setXScore(xScore+1)
            localStorage.setItem( "xScore", xScore+1 )
            setGameEnded( [ true, "x" ] )
          }
          else if(gameState[key] === "ooo"){
            setOScore(oScore+1)
            localStorage.setItem( "oScore", oScore+1 )
            setGameEnded( [ true, "o" ] )
          }
        }

        if ( Object.values( gameState ).every( item => item.length === 3 ) && Object.values( gameState ).every( item => (item != "xxx" || item != "ooo") ) ) {
          setTiesScore(tiesScore+1)
          localStorage.setItem( "tiesScore", tiesScore+1 )
          setGameEnded( [ true, "tie" ] )
        }
      }, 1000)
      
    }, [ gameState ] )
  
  //useEffect hook to check if scores already exist on local, if not then create them
    React.useEffect( () => {
      !localStorage.getItem( "xScore" ) && localStorage.setItem( "xScore", 0 )
      !localStorage.getItem( "oScore" ) && localStorage.setItem( "oScore", 0 )
      !localStorage.getItem("tiesScore") && localStorage.setItem("tiesScore", 0)
    },[])
    
  let winnerColor = ""
  if ( gameEnded[ 1 ] === "x" ) {
    winnerColor = "winner--blue"
  }
  else if ( gameEnded[ 1 ] === "o" ) {
    winnerColor = "winner--yellow"
  } else {
    winnerColor = "winner--grey"
  }

  return(
    <section className="app">
      <main>
        <section className="header">
          <section className="header__logo">
            <span className="header__logo--x">x</span>
            <span className="header__logo--o">o</span>
          </section>

          {player1 ? 
            <section className="header__player-turn"><span className="player">x</span><span className="turn">TURN</span></section>
             : 
            <section className="header__player-turn"><span className="player">o</span><span className="turn">TURN</span></section>
          }

          <section className="header__reset-button__container">
            <button type="button" className="header__reset-button" onClick={handleResetGame}>{'\u21BB'}</button>
          </section>
          
        </section>

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

        <section className="footer">
          <section className="footer_x-score">
            <p>X (PLAYER 1)</p>
            <strong>{xScore}</strong>
          </section>
          <section className="footer_ties-score">
            <p>TIES</p>
            <strong>{tiesScore}</strong>
          </section>
          <section className="footer_o-score">
            <p>O (PLAYER 2)</p>
            <strong>{oScore}</strong>
          </section>
        </section>

        
      </main>

      {gameEnded[ 0 ] &&
       (<section className="win-modal">
          <section className="win-modal__content">
          {gameEnded[1] != "tie" && <p>YOU WON!</p>}
          <span class={winnerColor} id={gameEnded[ 1 ] === "tie" ? "--tie" : ""}>
            <strong id="strong">{gameEnded[ 1 ] === "tie" ? "" : gameEnded[ 1 ]}</strong>
            {gameEnded[ 1 ] === "tie" ? "IT'S A TIE" : " TAKES THE ROUND"}
          </span>
          <section>
            <button type="button" className="reset-score__button" onClick={handleResetScore}>QUIT</button>
            <button type="button" className="reset-game__button" onClick={handleResetGame}>NEXT ROUND</button>
          </section>
          </section>
        </section>)
      }
    </section>
  )
}