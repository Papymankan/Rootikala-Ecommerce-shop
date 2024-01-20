import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Landing from "../../Components/Landing/Landing";
import LastProducts from "../../Components/LastProducts/LastProducts";
import NavBar from "../../Components/NavBar/NavBar";
import PopularProducts from "../../Components/PopularProducts/PopularProducts";
import SaleProducts from "../../Components/SaleProducts/SaleProducts";

export default function Home() {
  const [products , setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:9000/store/products', {
    }).then(res => res.json()).then(data => setProducts(data.products))
  }, [])

  return (
    <>
      <NavBar />
      <Landing />
      <SaleProducts />
      <LastProducts products={products}/>
      <PopularProducts />
      <Footer />
    </>
  );
}
