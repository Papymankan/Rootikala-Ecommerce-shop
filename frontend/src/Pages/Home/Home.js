import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Landing from "../../Components/Landing/Landing";
import LastProducts from "../../Components/LastProducts/LastProducts";
import NavBar from "../../Components/NavBar/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <Landing />
      <LastProducts/>
      <Footer/>
    </>
  );
}
