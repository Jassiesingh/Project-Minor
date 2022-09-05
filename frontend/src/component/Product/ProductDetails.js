import { React, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import Spinner from '../loader/Spinner'
import ReviewCard from "./ReviewCard.js"
import { useAlert } from "react-alert"
import "./ProductDetails.css"
import Metadata from '../layout/Metadata'
import { addItemsToCart } from "../../actions/cartAction"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails =  ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert()

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    const addToCartHandler = () => {
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Item Added To Cart");
    };

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }

    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantitiy = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty)
    }

    const decreaseQuantitiy = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty)
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(match.params.id));
    }, [dispatch, match.params.id, error, alert, reviewError, success]);

    return (
        (loading ? <Spinner /> : <>
            <Metadata title={`${product.name} -- ECOMMERCE`} />

            <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images && product.images.map((item, i) => (
                    <img className="CarouselImage" key={i} src={item.url} alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

                <div >
                    <div className="detailsBlock-1">
                        <h2 >{product.name}</h2>
                        <p >Product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <Rating {...options} />
                        <span>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1 >{`₹ ${product.price}`}</h1>
                        <div className="detailsBlock-3-1 flex items-center">
                            <div className="detailsBlock-3-1-1">
                                <button onClick={decreaseQuantitiy}>-</button>
                                <input readOnly value={quantity} type="number" />
                                <button onClick={increaseQuantitiy}>+</button>
                            </div>
                            <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to cart</button>
                        </div>
                        <p>
                            Status :
                            <b className={product.stock < 1 ? "text-red-500" : "text-green-700"}>
                                {product.stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>
                    <div className="detailsBlock-4">
                        Description: <p>{product.description}</p>
                    </div>
                    <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                </div>
            </div>

            <h3 className='reviewsHeading'>Reviews</h3>

            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
            >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                    <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                    />

                    <textarea
                        className="submitDialogTextArea"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>


            {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                    {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
                </div>
            ) : (
                <p className='noReviews'>No reviews yet</p>
            )}



        </>)
    )
}

export default ProductDetails