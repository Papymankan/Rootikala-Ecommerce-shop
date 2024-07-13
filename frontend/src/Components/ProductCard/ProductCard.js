import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EntoFa from "../../funcs/EntoFa/EntoFa";

export default function ProductCard({ title, thumbnail, variants, collection , id}) {


    return (
        <>
            <div className="ProductCard">
                <Link to={`/product/${id}`}>
                    <img src={thumbnail} />
                    <span>{title}</span>
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

                    <span style={collection && collection.id == 'pcol_01HMR5RCMZ4RCE58VJ59AWXA7V' && { display: 'none' }}>
                        {variants.some(variant => variant.inventory_quantity > 0) ?
                            (<>{(variants[0].prices[0].amount).toLocaleString().EntoFa()} تومان</>)
                            : (<>موجود نیست</>)}
                    </span>
                </Link>
            </div>
        </>
    );
}
