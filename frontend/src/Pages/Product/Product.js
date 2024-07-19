import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import './Product.css'
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import EntoFa from "../../funcs/EntoFa/EntoFa";
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import { MdShare, MdCompare } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { BsClockHistory } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../Context/Context";
import { toast } from "react-toastify";

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

    const authContext = useContext(AuthContext)

    const [product, setProduct] = useState({})
    const [thumbnail, setThumbnail] = useState('')
    const [colorSelected, setColorSelected] = useState({})
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (product.thumbnail) {
            setThumbnail(product.thumbnail)
        }
        if (product.variants) {
            product.variants.some(variant => {
                if (variant.inventory_quantity != 0) {
                    setColorSelected(variant)
                    return true
                }
                return false
            })
        }
    }, [product])

    useEffect(() => {
        setQuantity(1)
    }, [colorSelected])

    const notify = (text) => toast.success(text, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const AddToCartHandler = () => {
        var cartID = JSON.parse(localStorage.getItem('cartID'))
        let item = {
            variant_id: colorSelected.id,
            quantity,
        }
        if (!cartID) {

            const createCartPromise = new Promise((resolve) => {
                // console.log(authContext.createCart());
                resolve(authContext.createCart())
            })

            createCartPromise.then(res => {
                cartID = res
                if (res) {
                    fetch(`http://localhost:9000/store/carts/${cartID}/line-items`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(item)
                    }).then(res => {
                        if (res.ok) {
                            notify('با موفقیت به سبد خرید اضافه شد')
                        }
                        res.json()
                    }).then(data => {
                        authContext.getCart(cartID)
                    })
                }
            })

        } else {
            fetch(`http://localhost:9000/store/carts/${cartID}/line-items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(res => {
                if (res.ok) {
                    notify('با موفقیت به سبد خرید اضافه شد')
                }
                res.json()
            }).then(data => {
                authContext.getCart(cartID)
            })
        }
    }

    const lightGallery = useRef('gallery');
    const onInit = useCallback((detail) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);

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
                            <div className="LastImageBlur" onClick={() => {
                                console.log('click');
                                lightGallery.current.openGallery(0);
                            }}>
                                <img src="http://localhost:9000/uploads/1708421712623-503a50201bfdeca14002b8bd006ac2f1cee7c661_1662029535.webp" />
                                <span>...</span>
                            </div>
                        </div>
                        <LightGallery
                            onInit={onInit}
                            elementClassNames={'gallery'}
                            dynamic={true}
                            plugins={[lgZoom, lgVideo, lgThumbnail]}
                            dynamicEl={[
                                {
                                    src: "http://localhost:9000/uploads/1708421712623-503a50201bfdeca14002b8bd006ac2f1cee7c661_1662029535.webp",

                                },
                                {
                                    src: 'https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
                                    responsive:
                                        'https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80 800',
                                    thumb:
                                        'https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
                                },
                                {
                                    src: 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
                                    responsive:
                                      'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80 800',
                                    thumb:
                                      'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
                                    subHtml: `<div class="lightGallery-captions">
                                              <h4>Photo by <a href="https://unsplash.com/@brookecagle">Brooke Cagle</a></h4>
                                              <p>Description of the slide 1</p>
                                          </div>`,
                                  },
                            ]}
                        ></LightGallery>
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
                                            product.variants && product.variants.map((variant) => {
                                                return (
                                                    <button className={colorSelected.id == variant.id ? 'Color SelectColor_Active' : 'Color'} onClick={() => setColorSelected(variant)} disabled={variant.inventory_quantity == 0 && true}>
                                                        <span style={{ background: `${variant.metadata.color}` }}></span>
                                                        <span>{variant.title.EntoFa()}</span>
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="HealthGuarantee">
                                    <IoShieldCheckmarkOutline /> تضمین سلامت فیزیکی و اصالت کالا
                                </div>
                                {
                                    Object.keys(colorSelected).length != 0 ? (
                                        <div className="AddToCart_Container">
                                            <div className="Quantity_Container">
                                                <div className="quantity">
                                                    <FaPlus onClick={quantity < colorSelected.inventory_quantity ? () => setQuantity(quantity + 1) : () => { }} />
                                                    {(quantity + '').EntoFa()}
                                                    <FaMinus onClick={quantity > 1 ? () => setQuantity(quantity - 1) : () => { }} />
                                                </div>
                                                <span>

                                                    {
                                                        (Object.keys(colorSelected).length != 0 && (
                                                            product.collection_id == 'pcol_01HMR5RCMZ4RCE58VJ59AWXA7V' ?
                                                                colorSelected.prices[0].amount *
                                                                (100 - product.collection.metadata.percent) / 100 * quantity :
                                                                (colorSelected.prices[0].amount * quantity)

                                                        )).toLocaleString().EntoFa()
                                                    }
                                                    <span>  </span>
                                                    تومان
                                                    {
                                                        product.collection_id == 'pcol_01HMR5RCMZ4RCE58VJ59AWXA7V' &&
                                                        <span className="discount">%{product.collection.metadata.percent.EntoFa()}</span>
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    ) : (<></>)
                                }
                                <button className={Object.keys(colorSelected).length == 0 ? 'AddToCart_Button AddToCart_Button_disabled' : 'AddToCart_Button'} disabled={Object.keys(colorSelected).length == 0} onClick={AddToCartHandler}>
                                    {
                                        Object.keys(colorSelected).length == 0 ? 'موجود نیست' : 'افزودن به سبد خرید'
                                    }
                                </button>
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
            <div className="Container" id="ProductText">
                <div className="ProductText_Header">
                    <a href="#Introduce_Container">معرفی</a>
                    <a href="#Attributes_Container">مشخصات</a>
                </div>
                <div id="Introduce_Container">
                    <h3>معرفی</h3>
                    <p>
                        چه در حال تمرین و چه در زندگی روزمره، این کفش‌های اورجبنال نیوبالانس طوری طراحی شده‌اند که در هر نوع حرکت با شما همراه باشند. جزئیات متمرکز بر عملکرد مانند زیره میانی DynaSoft و زیره لاستیکی بادوام به این کفش وزن سبک و واکنش پذیری بالایی می بخشد که performance ورزشی شما را افزایش می دهد. ترکیب رنگی این کفش جذابیت و شادابی دو چندانی را به استایل اسپورت شما می بخشد.
                    </p>
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
                    </p>
                    <img src={thumbnail} />
                </div>
                <div id="Attributes_Container">
                    <h3>مشخصات</h3>
                    <div className="Attributes">
                        <div className="Attribute">
                            <div className="Attribute_Key">جنس</div>
                            <div className="Attribute_Value">
                                <span>پارچه</span>
                            </div>
                        </div>
                        <div className="Attribute">
                            <div className="Attribute_Key">جنس زیره</div>
                            <div className="Attribute_Value">
                                <span>لاستیک</span>
                            </div>
                        </div>
                        <div className="Attribute">
                            <div className="Attribute_Key">ویژگی‌های زیره</div>
                            <div className="Attribute_Value">
                                <span>انعطاف پذیر</span>
                                <span>دارای بالشتک هوا</span>
                                <span>قابلیت ارتجاعی</span>
                                <span>قابلیت گردش هوا</span>
                                <span>کاهش فشار وارده</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}