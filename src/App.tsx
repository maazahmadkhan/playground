import { lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("./pages/Home"));
const PeriodTracker = lazy(() => import("./pages/PeriodTracker"));
const SalahCounter = lazy(() => import("./pages/SalahCounter"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/period-tracker" element={<PeriodTracker />} />
      <Route path="/salah-counter" element={<SalahCounter />} />
    </Routes>
  );
}

export default App;
