import './App.css'
import Products from './components/Products'
import Header from './components/Header'
import { useFilter } from './hooks/useFilter'
import Cart from './components/Cart'
import { CartProvider } from './context/cart'

function App () {
  const { products } = useFilter()
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={products} />

    </CartProvider>

  )
}

export default App
