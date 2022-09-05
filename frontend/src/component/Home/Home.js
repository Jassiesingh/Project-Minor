import React, { useEffect } from 'react'
import "./Home.css"
import ProductCard from "./ProductCard.js"
import Metadata from '../layout/Metadata'
import { clearErrors, getProduct } from "../../actions/productAction"
import { useSelector, useDispatch } from "react-redux"
import Spinner from '../loader/Spinner'
import { useAlert } from 'react-alert'

const Home = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        dispatch(getProduct())
    }, [dispatch, error, alert])

    return (
        (loading ? <Spinner /> : <>
            <Metadata title="Ecommerce" />

            <div className="banner bg-cover md:bg-fixed bg-center bg-no-repeat bg-scroll">
                <p>Welcome to Ecommerce</p>
                <h3 className='text-2xl my-1'>Find amazing deals on clothing, footwear beauty & more</h3>
            </div>

            <h2 className='homeHeading text-center text-2xl font-bold my-5'>Featured products</h2>
            <hr className='bg-black mx-auto w-60 my-2' />

            <div id='container' className="container flex flex-wrap justify-center px-[5vmax] ">
                {products && products.map(product => (
                    <ProductCard product={product} key={product._id} />
                ))}
            </div>

        </>)
    )
}

export default Home