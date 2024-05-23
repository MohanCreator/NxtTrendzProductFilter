import {BsFilterRight} from 'react-icons/bs'
import {IoSearchOutline} from 'react-icons/io5'

import './index.css'

const ProductsHeader = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const onchangeValue = event => {
    const {onSearchValue} = props
    onSearchValue(event.target.value)
  }

  const onKeyEnter = event => {
    const {onSearch} = props
    if (event.key === 'Enter') {
      onSearch()
    }
  }

  const {sortbyOptions, activeOptionId, titleSearch} = props

  return (
    <div className="products-header">
      <div className="input-container">
        <input
          onKeyDown={onKeyEnter}
          onChange={onchangeValue}
          className="search-input"
          type="search"
          value={titleSearch}
        />
        <IoSearchOutline />
      </div>
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
