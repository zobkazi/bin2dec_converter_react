import NavBar from './components/ui/NavBar.jsx';
import AllRoutes from './routes.jsx';

const App = () => {
    return (
        <div className="flex">
            <NavBar />
            <div className="ml-64 p-4 flex-grow">
                <AllRoutes />
            </div>
        </div>
    );
};

export default App;
