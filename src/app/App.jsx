import React from 'react'
import MusicPlayer from '../components/core/player/MusicPlayer'
import TicTacToe from '../components/core/resetGame/TicTacToe'
import Stopwatch from '../components/core/timer/Stopwatch'
import TicTacToe1 from '../components/core/resetGame/TicTacToe1'
import Timer from '../components/core/timer/Timer'
import CurrencyInput from '../components/ui/CurrencyInput'
import TodoApp from '../components/core/todo/TodoApp'
import BinaryConverter from '../components/ui/BinaryConverter'

const App = () => {
  return (
    <div>
      <TodoApp />
      <BinaryConverter />
      <MusicPlayer />
      <TicTacToe />
      <Stopwatch />
      <TicTacToe1 />
      <Timer />

      <hr style={{ margin: '2rem 0' }} />
      <CurrencyInput />

      
    </div>
  )
}

export default App