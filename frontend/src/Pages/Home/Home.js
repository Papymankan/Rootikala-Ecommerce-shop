import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Landing from "../../Components/Landing/Landing";
import LastProducts from "../../Components/LastProducts/LastProducts";
import NavBar from "../../Components/NavBar/NavBar";
import PopularProducts from "../../Components/PopularProducts/PopularProducts";
import SaleProducts from "../../Components/SaleProducts/SaleProducts";

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`http://localhost:9000/store/products`, {
    }).then(res => res.json()).then(data => setProducts(data.products))

    fetch(`http://localhost:9000/store/products?collection_id[]=${'pcol_01HMR5RCMZ4RCE58VJ59AWXA7V'}`, {
    }).then(res => {
      // console.log(res)
      return res.json()
    }).then(data => console.log(data))

    // fetch('http://localhost:9000/store/collections').then(res => res.json()).then(data => console.log(data))
  }, [])

  return (
    <>
      <NavBar />
      <Landing />
      <SaleProducts products={products} />
      <LastProducts products={products} />
      <Footer />
    </>
  );
}
// "pcol_01HMR5RCMZ4RCE58VJ59AWXA7V"