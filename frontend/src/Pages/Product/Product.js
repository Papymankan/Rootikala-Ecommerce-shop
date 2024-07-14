import React, { useEffect, useState } from "react";
import './Product.css'
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import EntoFa from "../../funcs/EntoFa/EntoFa";
import { MdShare, MdCompare } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { BsClockHistory } from "react-icons/bs";
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
                setProduct(data.product)
            })
        }
    }, [id])


    const [product, setProduct] = useState({})
    const [thumbnail, setThumbnail] = useState('')
    const [colorSelected, setColorSelected] = useState('')
    useEffect(() => {
        if (product.thumbnail) {
            setThumbnail(product.thumbnail)
        }
    }, [product])

    return (
        <>
            <NavBar />
            <div className="Container" id="ProductDetail">
                <div id="ProductDetail_Container">
                    <div className="ProductImg_Container">
                        <div className="Product_Actions">
                            <span><IoMdHeartEmpty /></span>
                            <span><MdCompare /></span>
                            <span><MdShare /></span>
                        </div>
                        <div className="Tumbnail_Container">
                            <img src={thumbnail} />
                        </div>
                        <div className="Images_Container">
                            <div>
                                <img src={thumbnail} />
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
                                {product.tags && product.tags.map(tag =>
                                    (<span><Link to={`/tag/${tag.id}`}>{tag.value}</Link></span>)
                                )}
                            </div>
                            <div className="ProductName">
                                {product.title}
                            </div>
                        </div>
                        <div className="ProductSpecs_Container">
                            <div className="ProductSpecs">
                                <div>
                                    {/* کد کالا 6457#  |  20 دیدگاه */}
                                    <span>کد کالا {('6457').EntoFa()}#</span>
                                    <span>|</span>
                                    <span>{('20').EntoFa()} دیدگاه</span>
                                </div>
                                <span>
                                    <AiOutlineLike /> 80%  از خریداران، خرید این کالا را پیشنهاد کرده‌اند
                                </span>
                                <h4>ویژگی های محصول</h4>
                                <ul className="ProductAttributes_List">
                                    <li>
                                        <span>جنس</span> : <span>پارچه</span>
                                    </li>
                                    <li>
                                        <span>جنس زیره</span> : <span>لاستیک</span>
                                    </li>
                                    <li>
                                        <span>نحوه بسته شدن کفش</span> : <span>بندی</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="ProductVariants">
                                <div className="ColorSelect_Container">
                                    <span>انتخاب رنگ و سایز</span>
                                    <div>
                                        {
                                            product.variants && product.variants.map(variant => (
                                                <button className={colorSelected == variant.id ? 'Color SelectColor_Active' : 'Color'} onClick={() => setColorSelected(variant.id)} disabled={variant.inventory_quantity == 0 && true}>
                                                    <span style={{ background: `${variant.metadata.color}` }}></span>
                                                    <span>{variant.title}</span>
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="HealthGuarantee">
                                    <IoShieldCheckmarkOutline /> تضمین سلامت فیزیکی و اصالت کالا
                                </div>
                                <div className="AddToCart_Container">
                                    <div className="Quantity_Container">
                                        <div className="quantity">
                                            <FaPlus />
                                            {('2').EntoFa()}
                                            <FaMinus />
                                        </div>
                                        <span>{(1800000).toLocaleString().EntoFa()} تومان</span>
                                    </div>
                                </div>
                                <button className="AddToCart_Button">افزودن به سبد خرید</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Services_Container">
                    <div className="Service">
                        <BsClockHistory />
                        هفت روز ضمانت بازگشت کالا
                    </div>
                    <div className="Service">
                        <IoShieldCheckmarkOutline />
                        تضمین اصالت کالا
                    </div>
                    <div className="Service">
                        <TfiHeadphoneAlt />
                        هفت روز هفته
                    </div>
                    <div className="Service">
                        <CiDeliveryTruck />
                        تحویل اکسپرس در تهران, کرج
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
