import { Route,  } from 'wouter';
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
import RGBColorPicker from '../components/ui/web/RGBColorPicker';
import CMYKColorPicker from '../components/ui/web/CMYKColorPicker';
import RedirectCodeGenerator from '../components/ui/web/RedirectCodeGenerator';
import UrlEncoder from '../components/ui/web/UrlEncoder';
import UrlDecoder from '../components/ui/web/UrlDecoder';
import BrowserWindowSize from '../components/ui/web/BrowserWindowSize';
import LocationAndOnlineCheck from '../components/ui/web/LocationAndOnlineCheck';
import WebsiteTrafficTracker from '../components/ui/web/WebsiteTrafficTracker';

const AllRoutes = () => {
  return (
    <>
      <div>
        
        
        <div>
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
          <Route path="/rgb-color-picker" component={RGBColorPicker} />
          <Route path="/cmyk-color-picker" component={CMYKColorPicker} />
          <Route path="/redirect-code-generator" component={RedirectCodeGenerator} />
          <Route path="/urlencoder" component={UrlEncoder} />
          <Route path="/urldecoder" component={UrlDecoder} />
          <Route path="/browser-window-size" component={BrowserWindowSize} />
          <Route path="/location-and-online-check" component={LocationAndOnlineCheck} />
          <Route path="/website-traffic-tracker" component={WebsiteTrafficTracker} />
          
          {/* Default route or fallback */}
          <Route path="/" component={() => <h1 className="text-2xl">Welcome! Select a component from the menu.</h1>} />
        </div>
      </div>
    </>
  );
}

export default AllRoutes;
