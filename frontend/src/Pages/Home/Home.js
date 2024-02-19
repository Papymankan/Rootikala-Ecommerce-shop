import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Landing from "../../Components/Landing/Landing";
import LastProducts from "../../Components/LastProducts/LastProducts";
import NavBar from "../../Components/NavBar/NavBar";
import PopularProducts from "../../Components/PopularProducts/PopularProducts";
import SaleProducts from "../../Components/SaleProducts/SaleProducts";

export default function Home() {
  const [products, setProducts] = useState([])
  // const [categories, setCategories] = useState([])
  // const [listedCats, setListedCats] = useState([])

  useEffect(() => {
    fetch(`http://localhost:9000/store/products`, {
    }).then(res => res.json()).then(data => setProducts(data.products))

    // fetch(`http://localhost:9000/store/product-categories`, {
    // }).then(res => res.json()).then(data => setCategories(data.product_categories))

    // fetch(`http://localhost:9000/store/products?collection_id[]=${'pcol_01HMR5RCMZ4RCE58VJ59AWXA7V'}`, {
    // }).then(res => {
    //   return res.json()
    // }).then(data => console.log(data))

  }, [])

  // useEffect(() => {
  //   let arrangedCategories = categories
  //   if (arrangedCategories) {
  //     let arr2 = []
  //     arrangedCategories.map(category => {
  //       if (!category.parent_category_id) {
  //         let arr = []
  //         category.category_children.map(child => {
  //           arrangedCategories.map(cat => {
  //             cat.id == child.id && arr.push(cat);
  //           })
  //         })
  //         category['childs'] = arr
  //         arr2.push(category)
  //       }
  //     })
  //     setListedCats(arr2)
  //   }
  // }, [categories])

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