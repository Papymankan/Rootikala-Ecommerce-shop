import React from "react";
import { Link } from "react-router-dom";
import './AllProductsCard.css'
export default function AllProductsCard({ title, thumbnail, variants, collection }) {
    return (
        <>
            <div className="AllProductsCard">
                <Link>
                    <img src={thumbnail} />
                    <span>{title}</span>
                    {
                        collection && collection.id == 'pcol_01HMR5RCMZ4RCE58VJ59AWXA7V' && (
                            <div>
                                <span>{(variants[0].prices[0].amount).toLocaleString()}</span>
                                <span>
                                    {(variants[0].prices[0].amount * (100 - collection.metadata.percent) / 100).toLocaleString()} تومان
                                    <span>
                                        50%
                                    </span>
                                </span>
                            </div>
                        )
                    }

                    <div  style={collection && collection.id == 'pcol_01HMR5RCMZ4RCE58VJ59AWXA7V' && { display: 'none' }} className={'AllProductsCard_price'}>
                        <span>{(variants[0].prices[0].amount).toLocaleString()} تومان</span>
                    </div>
                </Link>
            </div>
        </>
    );
}
