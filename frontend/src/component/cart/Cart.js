import React from 'react'
import "./Cart.css"
import CartItemCard from "./CartItemCard.js"
import { useSelector, useDispatch } from "react-redux"
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Cart = ({history}) => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return
        }
        dispatch(addItemsToCart(id, newQty))
    }
    const decreaseQuantity = (id, quantity) => {
        if (1 >= quantity) return;
        const newQty = quantity - 1;
        dispatch(addItemsToCart(id, newQty))
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => { 
        history.push("/login?redirect=shipping")
    }

    return (
        (cartItems.length === 0 ? (<div className='emptyCart'>
            <RemoveShoppingCartIcon />
            <Typography>No products in your cart</Typography>
            <Link to="/products">View products </Link>
        </div>) : <>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>

                {cartItems && cartItems.map((item) => (
                    <div className="cartContainer" key={item.product}>
                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                        <div className="cartInput">
                            <button onClick={() => decreaseQuantity(item.product, item.quantity, item.stock)}>-</button>
                            <input type="number" readOnly value={item.quantity} />
                            <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                        </div>
                        <p className='cartSubTotal'>{`₹ ${item.price * item.quantity}`}</p>
                    </div>
                ))}


                <div className="cartGrossTotal">
                    <div></div>
                    <div className="cartGrossTotalBox">
                        <p>Gross Total</p>
                        <p>{`₹ ${cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price, 0
                        )}`}</p>
                    </div>
                    <div></div>
                    <div className="checkoutBtn" onClick={checkoutHandler}>
                        <button>Check Out</button>
                    </div>
                </div>
            </div>
        </>)
    )
}

export default Cart