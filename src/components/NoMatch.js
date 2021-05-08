import React from "react";
import { Link } from "react-router-dom";
const NoMatch = () => {
  return (
    <div >
      <div >
        <h1 >Page not found</h1>
        <p >
          You can return <Link to="/">home</Link>.
        </p>
      </div>
    </div>
  );
};

export default NoMatch;

