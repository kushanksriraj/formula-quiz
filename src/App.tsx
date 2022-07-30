import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Quiz,
  Result,
  SignUp,
  UndefinedRoute,
  UserProfile,
} from "./pages";
import { NavBar, PrivateRoute } from "./components";
import { useLoadData } from "./hooks";
import { SessionsModal } from "./components/SessionsModal/SessionsModal";

function App(): JSX.Element {
  useLoadData();

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <PrivateRoute path="/quiz/:id" element={<Quiz />} />
        <PrivateRoute path="/quiz/:id/result" element={<Result />} />
        <PrivateRoute path="/user" element={<UserProfile />} />
        <Route path="*" element={<UndefinedRoute />} />
      </Routes>
      <SessionsModal />
    </div>
  );
}

export default App;
