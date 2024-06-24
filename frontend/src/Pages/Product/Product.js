import React from "react";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import { MdShare, MdCompare } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";

import './Product.css'

export default function Product() {
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

                </div>
            </div>
            <Footer />
        </>
    );
}
