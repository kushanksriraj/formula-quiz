import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Quiz, Result, UndefinedRoute } from "./pages";
import { NavBar } from "./components";

function App(): JSX.Element {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/quiz/:id/result" element={<Result />} />
        <Route path="*" element={<UndefinedRoute />} />
      </Routes>
    </div>
  );
}

export default App;
