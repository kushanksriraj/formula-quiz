import { useNavigate } from "react-router";
import "./NavBar.css";

export const NavBar = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="quiz__nav" onClick={() => navigate("/")}>
        <div className="material-icons-round quiz__nav__logo">fact_check</div>
        <div className="quiz__nav__text">Formula Quiz</div>
      </div>
    </div>
  );
};
