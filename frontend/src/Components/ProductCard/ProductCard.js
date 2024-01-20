import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({title , thumbnail , variants}) {
    return (
        <>
            <div className="ProductCard">
                <Link>
                    <img src={thumbnail} />
                    <span>{title}</span>
                    <div>
                        <span>{(10000000).toLocaleString()}</span>
                        <span>
                            {(1350000).toLocaleString()} تومان
                            <span>
                                50%
                            </span>
                        </span>
                    </div>
                    <span>{(variants[0].prices[0].amount).toLocaleString()} تومان</span>
                </Link>
            </div>
        </>
    );
}
