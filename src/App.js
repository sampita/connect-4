import React, { useState, useEffect } from 'react'
import './App.css'
import './index.css'

function App() {

  const [playerTurn, setPlayerTurn] = useState(1)
  const [gameboard, setGameboard] = useState([])

  const gameboardSize = {
    numberOfColumns: 7,
    numberOfRows: 6
  }

  const generateNewGameboard = () => {
    const emptySpace = { isFilledByPlayer: null }
    let emptyGameboard = [...Array(gameboardSize.numberOfRows)].map(() => Array(gameboardSize.numberOfColumns).fill(emptySpace))
    setGameboard(emptyGameboard)
    setPlayerTurn(1)
  }

  const getColorOfSpace = (gamespace) => {
    switch (gamespace.filledByPlayer) {
      case 1:
        return 'red'
        break
      case 2:
        return 'black'
        break
      default:
        return 'white'
        break
    }
  }

  const createDropButtons = () => {
    return (
      [...Array(gameboardSize.numberOfColumns)].map((e, i) => <th key={`drop-button-${i}`}><button id={`drop-button-${i}`} onClick={() => updateGameboard(i)}>DROP</button></th>)
    )
  }

  const checkIfShouldDisableDropButton = (columnIndex) => {
    if (gameboard[0][columnIndex].filledByPlayer) {
      const dropButton = document.getElementById(`drop-button-${columnIndex}`)
      dropButton.setAttribute("disabled", "disabled")
      dropButton.style.backgroundColor = 'gray'
    }
  }

  const updateGameboard = (columnIndex) => {
    // work backwards from bottom of column to top of column to check which space is available to be filled
    let turnIsComplete = false
    for (let i = gameboardSize.numberOfRows - 1; i >= 0; i--) {
      if (turnIsComplete) break
      let space = gameboard[i][columnIndex]
      if (!space.filledByPlayer) {
        gameboard[i].splice(columnIndex, 1, { filledByPlayer: playerTurn })
        setPlayerTurn(playerTurn === 1 ? 2 : 1)
        checkIfShouldDisableDropButton(columnIndex)
        turnIsComplete = true
      }
    }
  }

  useEffect(() => generateNewGameboard(), [])

  return (
    <div id="app">
      <h3 className='center' id='player-turn'>{playerTurn === 1 ? "Red" : "Black"}'s turn</h3>
      <section className='center'>
        <table>
          <thead>
            <tr id='drop-button-container'>
              {createDropButtons()}
            </tr>
          </thead>
        </table>
        <div id="gameboard">
          <table>
            <tbody>
              {gameboard.map((row, i) => {
                const rowIndex = i
                return (
                  <tr key={`row-${i}`}>
                    {row.map((space, i) => {
                      return (
                        <td key={`space-${i}`} style={{ backgroundColor: getColorOfSpace(space) }} onClick={() => updateGameboard(space, i, rowIndex)}></td>
                      )
                    }
                    )}
                  </tr>
                )
              }
              )}
            </tbody>
          </table>
        </div>
      </section>
      <div className="center">
        <button id="reset-button" onClick={() => generateNewGameboard()}>RESET</button>
      </div>
    </div>
  )
};

export default App;
