import "./login.css";
import { useRef, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { FromType } from "./login.type";
import { useUserData } from "../../hooks";

export const Login = (): JSX.Element => {
  const location = useLocation();
  const pathRef = useRef<FromType>(location.state);
  const { isUserLoggedIn, loginUser, userLoading } = useUserData();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const loginOnFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const email = (e.currentTarget[0] as HTMLInputElement).value.trim();
    const password = (e.currentTarget[1] as HTMLInputElement).value.trim();

    if (email === "" || password === "")
      return setError("Both fields are required! Try again.");

    const response = await loginUser(email, password);
    !response && setError("Wrong credentials! Try again.");
  };

  return (
    <>
      {isUserLoggedIn && <Navigate to={pathRef.current?.from || "/"} replace />}
      <div className="login__container">
        <div className="login">
          <h2>Log in to continue</h2>
          <form onSubmit={loginOnFormSubmit}>
            <div className="login__email">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" />
            </div>
            <div className="login__password">
              <label htmlFor="password">Password</label>
              <div className="login__password-box">
                <input
                  id="password"
                  type={showPassword ? "password" : "text"}
                />
                <div
                  className="material-icons-round login__password-hide"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "visibility" : "visibility_off"}
                </div>
              </div>
            </div>
            <div className="login__error">{error}</div>
            <div className="login__btn">
              <button type="submit">
                {userLoading ? "Loggin in.." : "LOG IN"}
              </button>
            </div>
          </form>
          <div className="login__signup-prompt">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              state={{ from: pathRef.current?.from || "/" }}
              replace
            >
              Sign up
            </Link>
            .
          </div>
        </div>
      </div>
    </>
  );
};
