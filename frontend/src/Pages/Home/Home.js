import React from "react";
import { Link } from "react-router-dom";
import Landing from "../../Components/Landing/Landing";
import NavBar from "../../Components/NavBar/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Landing />
      </div>
    </>
  );
}
