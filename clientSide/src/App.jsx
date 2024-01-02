
import YearlyRevenue from "./yearByYearLine"
import RevByCode from "./RevByCode"
import StackedBarContainer from "./StackedBarContainer"
import RevenueContainer from "./RevenueContainer"

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {

  return(
    <Router>
      <div className="flex bg-slate-800 w-100% h-screen">

        <div className="h-screen flex-row border-r border-gray-400 p-4 pt-40 justify-center items-center">
          <div className="justify-center">
          <nav className="space-y-2 flex flex-col justify-center">
            <Link className="text-green-400 hover:text-green-200" to="/revenue">Revenue Line</Link>
            <Link className="text-green-400 hover:text-green-200" to="/stackedbar">Stacked Miles</Link>  
            <Link className="text-green-400 hover:text-green-200" to="/RevByCode">Revenue by Code</Link>  
            <Link className="text-green-400 hover:text-green-200" to="/">Revenue by Year</Link>
          </nav>
          </div>
        </div>

        <div className="p-4 flex-1">
          <Routes>
            <Route path="/revenue" element={<RevenueContainer />} />
            <Route path="/stackedbar" element={<StackedBarContainer />} />
            <Route path="/RevByCode" element={<RevByCode />} />
            <Route path="/" element={<YearlyRevenue />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
  };

export default App;

