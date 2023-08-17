import React from 'react';
import { useCart } from '../Products/Process';
import './Cartpage.css'; 

const CartPage = ({ data }) => {
  const { cartItems, updateCartItem, addToCart } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 0) {
      updateCartItem(itemId, newQuantity);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1 className="title">Cart Page</h1>
      <div className="info">
        <p>Total Quantity: {getTotalQuantity()}</p>
        <p>Total Amount: ${getTotalAmount()}</p>
      </div>
     <div className='cart-container'>
     {data.map((item) => (
       <div className='container'>
           <div className="cart-item" key={item.id}>
          <h2>{item.title}</h2>
          <p>Price: ${item.price}</p>
          <p>Quantity: {getItemQuantity(item.id)}</p>
          <div>
          <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, getItemQuantity(item.id) + 1)}>
              +
            </button>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>
            <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, getItemQuantity(item.id) - 1)}>
            -
            </button>
          </div>
        </div>
       </div>
      ))}
     </div>
    </div>
  );
};

export default CartPage;