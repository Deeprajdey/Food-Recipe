import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorRoute = () => {
  const error = useRouteError();
  return (
    <div className="box bg-red flex-center flex-col">
      <h1 className="heading text-center">Error occured</h1>
      <p className="error-route-msg">{error.statusText || error.message}</p>
      <Link to="/" className="link">
        Go back
      </Link>
    </div>
  );
};

export default ErrorRoute;
