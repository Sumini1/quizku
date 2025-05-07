import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, className, children, onClick, type = "button" }) => {
  if (to) {
    return (
      <Link to={to}>
        <button className={`p-3 w-full rounded-xl border-none ${className}`}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-3 w-full rounded-xl border-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
