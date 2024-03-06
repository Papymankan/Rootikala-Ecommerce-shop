import React, { useEffect, useState } from "react";
import './Category.css'
import NavBar from "../../Components/NavBar/NavBar";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";

export default function Category() {

  const { id } = useParams()

  const [categoryDetails, setCategoryDetails] = useState({})

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:9000/store/product-categories/${id}`, {
      }).then(res => res.json()).then(data => setCategoryDetails(data.product_category))
    }
  }, [id])

  return (
    <>
      <NavBar />
      <BreadCrumb categoryDetails={categoryDetails}/>

      <Footer />
    </>
  );
}
