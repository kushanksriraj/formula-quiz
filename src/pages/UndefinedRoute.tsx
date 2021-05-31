import { Link } from "react-router-dom";

export const UndefinedRoute = (): JSX.Element => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>404</h1>
      <h3>
        Wrong URL, go to <Link to="/">Home</Link> page.
      </h3>
    </div>
  );
};
