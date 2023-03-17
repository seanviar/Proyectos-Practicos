import { useContext, useState } from 'react'
import { FilterContext } from '../context/filter'
import { products as initialProducts } from '../mocks/products.json'

export function useFilter () {
  /* const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  }) */
  const { filters } = useContext(FilterContext)

  const [products] = useState(initialProducts)

  const filterProducts = (products) => {
    return products.filter(product => {
      return product.price >= filters.minPrice && (
        filters.category === 'all' ||
             product.category === filters.category)
    })
  }
  return { products: filterProducts(products) }
}
