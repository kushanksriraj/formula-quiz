import { useNavigate } from "react-router";
import { useUserData } from "../../hooks";
import "./NavBar.css";

export const NavBar = (): JSX.Element => {
  const navigate = useNavigate();
  const { isUserLoggedIn, userData } = useUserData();
  return (
    <div>
      <div className="quiz__nav">
        <div
          className="material-icons-round quiz__nav__logo"
          onClick={() => navigate("/")}
        >
          fact_check
        </div>
        <div className="quiz__nav__text" onClick={() => navigate("/")}>
          Formula Quiz
        </div>
        {isUserLoggedIn && (
          <div className="quiz__nav__account">
            <div className="quiz__nav__account-greet">
              Hi {userData.name.split(" ")[0]}!
            </div>
            <div
              className="material-icons-round quiz__nav__logo-account"
              onClick={() => navigate("/user")}
            >
              account_circle
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
