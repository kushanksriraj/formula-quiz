import "./signup.css";
import { useRef, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useUserData } from "../../context/UserDataContext/UserDataContext";
import { FromType } from "./signup.types";

export const SignUp = (): JSX.Element => {
  const location = useLocation();
  const { isUserLoggedIn, signUpUser, userLoading } = useUserData();
  const pathRef = useRef<FromType>(location.state);
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const signUpOnFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const name = (e.currentTarget[0] as HTMLInputElement).value.trim();
    const email = (e.currentTarget[1] as HTMLInputElement).value.trim();
    const password = (e.currentTarget[2] as HTMLInputElement).value.trim();

    if (name === "" || email === "" || password === "")
      return setError("All fields are required!");

    const response = await signUpUser({
      name,
      email,
      password,
      path: "/user/sign-up",
    });

    !response && setError("Unable to sign up! Try again.");
  };

  return (
    <>
      {isUserLoggedIn && <Navigate to={pathRef.current?.from || "/"} replace />}
      <div className="signup__container">
        <div className="signup">
          <h2>Sign up to continue</h2>
          <form onSubmit={signUpOnFormSubmit}>
            <div className="signup__name">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" />
            </div>
            <div className="signup__email">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" />
            </div>
            <div className="signup__password">
              <label htmlFor="password">Password</label>
              <div className="signup__password-box">
                <input
                  id="password"
                  type={showPassword ? "password" : "text"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="material-icons-round signup__password-hide"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "visibility" : "visibility_off"}
                </div>
              </div>
            </div>
            <div className="signup__password-confirm">
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                id="confirm-password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="signup__error">
              {password !== confirmPassword && "Passwords must match!"}
            </div>
            <div className="signup__error">{error}</div>
            <div className="signup__btn">
              <button type="submit" disabled={password !== confirmPassword}>
                {userLoading ? "Signin up.." : "SIGN UP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
