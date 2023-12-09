import WeeklyCount from "./weeklyCount"
import MonthlyRevLine from "./monthlyRevLine"
import MonthlyTotalMiles from "./MonthlyTotalMiles"
import DestinationsPie from "./DestinationsPie"
import YearlyRevenue from "./YearlyRevenue"
import MonthlyRevByUser from "./MonthlyRevenueByUser"
import RevByCode from "./RevByCode"

import StackedBarContainer from "./StackedBarContainer"
import RevenueContainer from "./RevenueContainer"

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';





const App = () => {

  return(
    <Router>
      <div className="flex bg-slate-800 w-100% h-screen">
        <div className="border-r border-gray-300 p-4">
          <nav className="space-y-2 flex flex-col">
            <Link 
              className="text-green-400 hover:text-green-200"
              to="/revenue"
            >
              Revenue
            </Link>

            <Link
              className="text-green-400 hover:text-green-200" 
              to="/stackedbar"
            >
              Stacked Bar
            </Link>  
          </nav>
        </div>

        <div className="p-4 flex-1">
          <Routes>
            <Route path="/revenue" element={<RevenueContainer />} />
            <Route path="/stackedbar" element={<StackedBarContainer />} />
          </Routes>
        </div>
      </div>
    </Router>
    // <div className="flex items-center justify-center min-h-screen bg-slate-700">
    //   <div className="w-3/4">
    //     <StackedBarContainer />
    //     <RevenueContainer />
    //   </div>
      

    // </div>
  );
  };

export default App;

