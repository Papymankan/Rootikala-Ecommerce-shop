import React from "react";
import Footer from "../../Components/Footer/Footer";
import Landing from "../../Components/Landing/Landing";
import LastProducts from "../../Components/LastProducts/LastProducts";
import NavBar from "../../Components/NavBar/NavBar";
import PopularProducts from "../../Components/PopularProducts/PopularProducts";
import SaleProducts from "../../Components/SaleProducts/SaleProducts";

export default function Home() {
  return (
    <>
      <NavBar />
      <Landing />
      <SaleProducts/>
      <LastProducts/>
      <PopularProducts/>
      <Footer/>
    </>
  );
}
