import './App.css'
import Products from './components/Products'
import Header from './components/Header'
import { useFilter } from './hooks/useFilter'

function App () {
  const { products } = useFilter()
  return (
    <>
      <Header />
      <Products products={products} />

    </>

  )
}

export default App
