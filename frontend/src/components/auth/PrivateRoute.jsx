import { useState } from "react";
import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token === null) {
    return <Navigate to="/auth/login" />;
  }

  const decodedToken = jwtDecode(token);

  const isTokenValid = decodedToken.exp * 1000 > new Date().getTime();

  console.log(isTokenValid);

  //* If user is not logged in, redirect to login page
  //* Otherwise, render the children element that is set
  return isTokenValid ? children : <Navigate to="/auth/login" />;
}
