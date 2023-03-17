import React, { useId, useContext } from 'react'
import { FilterContext } from '../context/filter'

const Filter = () => {
  const { filters, setFilters } = useContext(FilterContext)
  const inputPriceId = useId()
  const selectCategoryId = useId()

  const handleMinPrice = (e) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: e.target.value
    }))
  }

  const handleCategory = (e) => {
    setFilters(prevState => ({
      ...prevState,
      category: e.target.value
    }))
  }

  return (
    <section>
      <div>
        <label htmlFor={inputPriceId}>Precio a partir de:</label>
        <input
          value={filters.minPrice}
          type='range'
          id={inputPriceId}
          min='0'
          max='1000'
          onChange={(e) => { handleMinPrice(e) }}
        />
      </div>
      <div>{filters.minPrice}</div>
      <div>
        <label htmlFor={selectCategoryId}>Categoria</label>
        <select name='' id={selectCategoryId} onChange={(e) => { handleCategory(e) }}>
          <option value='all'>all</option>
          <option value='home-decoration'>home-decoration</option>
          <option value='laptops'>laptops</option>
          <option value='smartphones'>smartphones</option>
          <option value='fragrances'>fragrances</option>
          <option value='skincare'>skincare</option>
          <option value='groceries'>groceries</option>
        </select>
      </div>
    </section>
  )
}

export default Filter
