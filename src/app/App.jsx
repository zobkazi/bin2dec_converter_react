import React from 'react';
import { Route, Router } from 'wouter';
import Sidebar from '../components/ui/Sidebar';
import TodoApp from '../components/core/todo/TodoApp';
import BinaryConverter from '../components/ui/BinaryConverter';
import AverageCalculator from '../components/ui/AverageCalculator';
import AdditionTable from '../components/ui/AdditionTable';
import MultiplicationTable from '../components/ui/MultiplicationTable';
import PercentageCalculator from '../components/ui/PercentageCalculator';
import MusicPlayer from '../components/core/player/MusicPlayer';
import TicTacToe from '../components/core/resetGame/TicTacToe';
import Stopwatch from '../components/core/timer/Stopwatch';
import TicTacToe1 from '../components/core/resetGame/TicTacToe1';
import Timer from '../components/core/timer/Timer';
import CurrencyInput from '../components/ui/CurrencyInput';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col sm:flex-row">
        <Sidebar />
        
        <div className="flex-1 p-6 overflow-y-auto sm:ml-64">
          <Route path="/todo" component={TodoApp} />
          <Route path="/binary-converter" component={BinaryConverter} />
          <Route path="/average-calculator" component={AverageCalculator} />
          <Route path="/addition-table" component={AdditionTable} />
          <Route path="/multiplication-table" component={MultiplicationTable} />
          <Route path="/percentage-calculator" component={PercentageCalculator} />
          <Route path="/music-player" component={MusicPlayer} />
          <Route path="/tic-tac-toe" component={TicTacToe} />
          <Route path="/stopwatch" component={Stopwatch} />
          <Route path="/tic-tac-toe1" component={TicTacToe1} />
          <Route path="/timer" component={Timer} />
          <Route path="/currency-input" component={CurrencyInput} />
          
          {/* Default route or fallback */}
          <Route path="/" component={() => <h1 className="text-2xl">Welcome! Select a component from the menu.</h1>} />
        </div>
      </div>
    </Router>
  );
}

export default App;
