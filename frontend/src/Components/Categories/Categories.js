import React from "react";
import { Link } from "react-router-dom";
import './Categories.css'

export default function Categories() {
    return (
        <>
            <div className="Container">
                <div className="CategoriesRowContainer">
                    <div className="CategoriesRow_Item">
                        <Link>
                            <img src="/Images/the-ian-ZCoqcrWp9GY-unsplash.jpg" alt="" />
                        </Link>
                    </div>
                    <div className="CategoriesRow_Item">
                        <Link>
                            <img src="/Images/yixian-zhao-q7iZCOXGOWY-unsplash.jpg" alt="" />
                        </Link>
                    </div>
                    <div className="CategoriesRow_Item">
                        <Link>
                            <img src="/Images/graham-mansfield-7jCYw6a2Wao-unsplash.jpg" alt="" />
                        </Link>
                    </div>
                    <div className="CategoriesRow_Item">
                        <Link>
                            <img src="/Images/the-ian-ZCoqcrWp9GY-unsplash.jpg" alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
