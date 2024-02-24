import React from "react";
import { Link } from "react-router-dom";
import './Categories.css'

export default function Categories() {
    return (
        <>
            <div className="Container">
                <div className="CategoriesRowContainer">


                    <Link>
                        <div className="CategoriesRow_Item">
                            <img src="/Images/the-ian-ZCoqcrWp9GY-unsplash.jpg" alt="" />
                            <span>
                                مردانه
                            </span>
                        </div>
                    </Link>
                    <Link>
                        <div className="CategoriesRow_Item">
                            <img src="/Images/the-ian-ZCoqcrWp9GY-unsplash.jpg" alt="" />
                            <span>
                                مردانه
                            </span>
                        </div>
                    </Link>
                    <Link>
                        <div className="CategoriesRow_Item">
                            <img src="/Images/the-ian-ZCoqcrWp9GY-unsplash.jpg" alt="" />
                            <span>
                                مردانه
                            </span>
                        </div>
                    </Link>
                    <Link>
                        <div className="CategoriesRow_Item">
                            <img src="/Images/the-ian-ZCoqcrWp9GY-unsplash.jpg" alt="" />
                            <span>
                                مردانه
                            </span>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    );
}
