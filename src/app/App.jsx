import { Router } from 'wouter';
import Sidebar from '../components/ui/Sidebar';
import AllRoutes from '../routes/AllRoutes';
const App = () => {
  return (
    <Router>
      <div className="flex flex-col sm:flex-row">
        <Sidebar />
        
        <div className="flex-1 p-6 overflow-y-auto sm:ml-64">
          <AllRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
