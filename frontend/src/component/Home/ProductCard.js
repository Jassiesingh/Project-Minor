import React from 'react'
import { Link } from "react-router-dom"
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
    const options = {
        size: "small",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }
    return (
        <>
            <Link className='productCard w-[15vmax] flex flex-col m-[2vmax]' key={product._id} to={`/product/${product._id}`}>
                <img className='w-60' src={product.images[0].url} alt={product.name} />
                <p className='text-2xl px-1 py-4 font-semibold mb-2'>{product.name}</p>
                <div className='flex space-x-3 text-gray-700 text-base'>
                    <Rating {...options} /> <span className=''>({product.numOfReviews} reviews)</span>
                </div>
                <span className=' text-red-900'>{`₹ ${product.price}`}</span>
            </Link>
        </>
    )
}

export default ProductCard

//Nothing on this file