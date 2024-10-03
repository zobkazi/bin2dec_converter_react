import {  Routes, Route } from "react-router-dom";
import Home from './pages/Home'; // Adjust the import path
import ScientificCalculator from './components/math/ScientificCalculator';

const AllRoutes = () => {
    return (
        
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/scientific" element={<ScientificCalculator />} />

            <Route path="*" element={<Home />} />

        </Routes>
        
       
    );
}

export default AllRoutes;
