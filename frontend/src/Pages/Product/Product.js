import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import { MdShare, MdCompare } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";

import './Product.css'
import { Link, useParams } from "react-router-dom";
// prod_01HQ2XX2RNYZGD98W5YMHHZ46B

export default function Product() {
    const { id } = useParams()
    useEffect(() => {
        if (id) {  
          fetch(`http://localhost:9000/store/products/${id}`, {
          }).then(res => {
            return res.json()
          }).then(data => {
            setProduct(data)
          })
        }
      }, [id])

      const [product , setProduct] = useState({})

    return (
        <>
            <NavBar />
            <div className="Container" id="ProductDetail_Container">
                <div className="ProductImg_Container">
                    <div className="Product_Actions">
                        <span><IoMdHeartEmpty /></span>
                        <span><MdCompare /></span>
                        <span><MdShare /></span>
                    </div>
                    <div className="Tumbnail_Container">
                        <img src="http://localhost:9000/uploads/1708421712623-503a50201bfdeca14002b8bd006ac2f1cee7c661_1662029535.webp" />
                    </div>
                    <div className="Images_Container">
                        <div>
                            <img src="http://localhost:9000/uploads/1708421712623-503a50201bfdeca14002b8bd006ac2f1cee7c661_1662029535.webp" />
                        </div>
                        <div className="LastImageBlur">
                            <img src="http://localhost:9000/uploads/1708421712623-503a50201bfdeca14002b8bd006ac2f1cee7c661_1662029535.webp" />
                            <span>...</span>
                        </div>
                    </div>
                </div>
                <div className="ProductVariants_Container">
                    <div className="ProductTitle_Container">
                        <div className="ProductTags">
                            <span><Link to={''}>کفش</Link></span>
                            <span><Link to={''}>کفش پیاده روی</Link></span>
                            <span><Link to={''}>کفش</Link></span>
                        </div>
                        <div className="ProductName">
                            کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2
                        </div>
                    </div>
                    <div className="ProductSpecs_Container">
                        <div className="ProductSpecs">

                        </div>
                        <div className="ProductVariants">

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
