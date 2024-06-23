import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EntoFa from "../../funcs/EntoFa/EntoFa";
import './AllProductsCard.css'

export default function AllProductsCard({ title, thumbnail, variants, collection }) {
    
  
    return (
        <>
            <div className="AllProductsCard">
                <Link>
                    <img src={thumbnail} />
                    <span>{title.EntoFa()}</span>
                    {
                        collection && collection.id == 'pcol_01HMR5RCMZ4RCE58VJ59AWXA7V' && (
                            <div>
                                <span>{(variants[0].prices[0].amount).toLocaleString().EntoFa()}</span>
                                <span>
                                    {(variants[0].prices[0].amount * (100 - collection.metadata.percent) / 100).toLocaleString().EntoFa()} تومان
                                    <span>
                                        {collection.metadata.percent.EntoFa()}%
                                    </span>
                                </span>
                            </div>
                        )
                    }

                    <div style={collection && collection.id == 'pcol_01HMR5RCMZ4RCE58VJ59AWXA7V' && { display: 'none' }} className={'AllProductsCard_price'}>
                        <span>{variants.some(variant => variant.inventory_quantity > 0) ?
                            (<>{(variants[0].prices[0].amount).toLocaleString().EntoFa()} تومان</>)
                            : (<>موجود نیست</>)
                        }</span>
                    </div>
                </Link>
            </div>
        </>
    );
}


// {(variants[0].prices[0].amount).toLocaleString()} 'تومان'