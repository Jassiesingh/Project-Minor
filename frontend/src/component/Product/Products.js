import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProduct } from "../../actions/productAction"
import Spinner from '../loader/Spinner'
import ProductCard from '../Home/ProductCard'
import "./Products.css"
import Pagination from "react-js-pagination"
import { useState } from 'react'
import Slider from "@material-ui/core/Slider"
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import Metadata from '../layout/Metadata'

const categories = [
    "Laptop",
    "Tshirt",
    "Footwear",
    "Attire",
    "Tops"
]

const Products = ({ match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 250000])
    const [ratings, setRatings] = useState(0)
    const [category, setCategory] = useState()
    const { products, loading, error, productsCount, resultsPerPage, filteredProductsCount } = useSelector(state => state.products)
    const keyword = match.params.keyword
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])
    let count = filteredProductsCount;
    return (
        (loading ? <Spinner /> : <>
            <Metadata title="PRODUCTS -- ECOMMERCE" />
            <div>
                <h2 className='productHeading'>Products</h2>
            </div>
            <div className="products">
                {products &&
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            </div>

            <div className="filterBox">
                <Typography>Price</Typography>
                <Slider value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby='range-slider'
                    min={0}
                    max={250000} />
                <Typography>Categories</Typography>
                <ul className="categoryBox">
                    {categories.map((category) => (
                        <li
                            className="category-link"
                            key={category}
                            onClick={() => setCategory(category)}>
                            {category}
                        </li>
                    ))}
                </ul>
                <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                            setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                    />
                </fieldset>

            </div>


            {resultsPerPage < count && <div className="paginationBox">
                <Pagination activePage={currentPage}
                    itemsCountPerPage={resultsPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"

                />
            </div>}
        </>)
    )
}
export default Products