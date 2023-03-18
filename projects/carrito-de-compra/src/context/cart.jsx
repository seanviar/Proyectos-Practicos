import { createContext, useState } from 'react'

export const CartContex = createContext()

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => { }

  const clearCart = (product) => {
    setCart([])
  }
  return (
    <CartContex.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContex.Provider>
  )
}
