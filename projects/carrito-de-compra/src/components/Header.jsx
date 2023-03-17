import React from 'react'
import Filter from './Filter.jsx'

const Header = ({ changeFilters }) => {
  return (
    <Filter changeFilters={changeFilters} />
  )
}

export default Header
