import { lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import { Toaster } from "sonner";

const Home = lazy(() => import("./pages/Home"));
const PeriodTracker = lazy(() => import("./pages/PeriodTracker"));
const SalahCounter = lazy(() => import("./pages/SalahCounter"));
const Todo = lazy(() => import("./pages/Todo"));
const Groceries = lazy(() => import("./pages/Groceries"));
const Chat = lazy(() => import("./pages/Chat"));
const Umri = lazy(() => import("./pages/Umri"));

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
        <Route path="/chat" element={<Chat />} />
        <Route path="/umri" element={<Umri />} />
      </Routes>
    </>
  );
}

export default App;
