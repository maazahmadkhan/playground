import { lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import { Toaster } from "sonner";

const Home = lazy(() => import("./pages/Home"));
const PeriodTracker = lazy(() => import("./pages/PeriodTracker"));
const SalahCounter = lazy(() => import("./pages/SalahCounter"));
const Todo = lazy(() => import("./pages/Todo"));
const Groceries = lazy(() => import("./pages/Groceries"));

function App() {
  return (
    <>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/period-tracker" element={<PeriodTracker />} />
        <Route path="/salah-counter" element={<SalahCounter />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/groceries" element={<Groceries />} />
      </Routes>
    </>
  );
}

export default App;
