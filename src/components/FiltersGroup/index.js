import './index.css'

// import RatingItems from '../RatingItems'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    updateCategory,
    updateRating,
    onClearAll,
  } = props

  const CategoryItems = props => {
    const {category} = props

    const onCat = () => {
      updateCategory(category.categoryId)
    }

    return (
      <li>
        <button className="cat-but" onClick={onCat}>
          <p>{category.name}</p>
        </button>
      </li>
    )
  }

  const RatingItems = props => {
    const {rating} = props
    const {imageUrl, ratingId} = rating

    const onRatingClick = () => {
      updateRating(ratingId)
    }

    return (
      <li className="rate-cont">
        <button onClick={onRatingClick} className="but-rat">
          <img
            className="rating-star"
            src={imageUrl}
            alt={`rating ${ratingId}`}
          />
          <p>&up</p>
        </button>
      </li>
    )
  }

  const onClear = () => {
    onClearAll()
  }

  return (
    <div className="filters-group-container">
      <h1>Category</h1>
      <ul className="list-cat">
        {categoryOptions.map(category => (
          <CategoryItems key={category.categoryId} category={category} />
        ))}
      </ul>
      <h1>Rating</h1>
      <ul className="list-rat">
        {ratingsList.map(rating => (
          <RatingItems key={rating.ratingId} rating={rating} />
        ))}
      </ul>
      <button className="clear-but" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
