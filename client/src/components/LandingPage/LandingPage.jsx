import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Style from "./LandingPage.module.css";

function LandingPage() {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <div className={Style.main_container}>
        <h1 className={Style.title}>HENRY BOOKS</h1>
        <h3>Online Books Store</h3>
        <div className={Style.paragram}>
          <p>
            Welcome to Henry's online store.
            <br /> On this website you can buy or sell the books that you like
            the most.
            <br /> We have a large catalog of books.
            <br /> What are you waiting for?
            <br /> Register and start selling or acquiring the best books.
          </p>
        </div>
        <div className={Style.btnLogin}>
          <button onClick={() => loginWithRedirect()}>Login</button>
          <button onClick={() => logout()}>Logout</button>
        </div>
        <div>
          <Link to="/home">
            <button className={Style.btnHome}>Go Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
