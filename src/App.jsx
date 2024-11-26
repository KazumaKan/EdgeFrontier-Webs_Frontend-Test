import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidbar from "./components/Sidbar";
import CardMode from "./components/CardMode";

import Dashboard from "./page/Dashboard";
import Statistics from "./page/Statistics";
import Setting from "./page/Setting";
import "./App.css";

const App = () => {
  return (
    <div className="content">
      <BrowserRouter>
        <Sidbar />
        <div className="content--page">
          <Routes>
            <Route path="/" element={<Dashboard />} /> 
            <Route path="Dashboard/" element={<Dashboard />} />
            <Route path="Statistics/" element={<Statistics />} />
            <Route path="Setting/" element={<Setting />} />


          </Routes>
        </div>
        <CardMode />
      </BrowserRouter>
    </div>
  );
};

export default App;
