import React, { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons'
import '../style/cart.css'
const Cart = () => {
  const cartCheckboxId = useId()
  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type='checkbox' id={cartCheckboxId} hidden />

      <aside className='cart'>
        <ul>
          <li>
            <img src='https://i.dummyjson.com/data/products/2/thumbnail.jpg' alt='iphone' />
            <div>
              <strong>iPhone</strong> -$1499
            </div>
            <footer>
              <small>
                Qty::1
              </small>
              <button>+</button>
            </footer>
          </li>
        </ul>
        <button>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}

export default Cart
