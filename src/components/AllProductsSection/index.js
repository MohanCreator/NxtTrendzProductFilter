import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    category: '',
    titleSearch: '',
    rating: '',
    hasError: false,
    activeCategory: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  onFailure = () => {
    return (
      <div>
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png'
          alt='products failure'
        />
        <p>Oops! Something Went Wrong</p>
        <p>We are having some trouble processing request. Please try again</p>
      </div>
    )
  }

  noProducts = () => {
    return (
      <div className='no-product-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png'
          alt='no products'
        />
        <p>No Products Found</p>
        <p>We could not find any products. Try another filter.</p>
      </div>
    )
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {activeOptionId, category, titleSearch, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const {products} = fetchedData
        if (products.length === 0) {
          this.setState({productsList: [], isLoading: false})
        } else {
          const updatedData = products.map(product => ({
            title: product.title,
            brand: product.brand,
            price: product.price,
            id: product.id,
            imageUrl: product.image_url,
            rating: product.rating,
          }))
          this.setState({
            productsList: updatedData,
            isLoading: false,
            hasError: false,
          })
        }
      } else {
        this.setState({hasError: true, isLoading: false})
      }
    } catch (error) {
      this.setState({hasError: true, isLoading: false})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  onSearchValue = value => {
    this.setState({titleSearch: value})
  }

  onSearch = () => {
    this.getProducts()
  }

  updateCategory = id => {
    this.setState({category: id}, this.getProducts)
  }

  updateRating = rating => {
    this.setState({rating: rating}, this.getProducts)
  }

  onClearAll = () => {
    this.setState(
      {
        activeOptionId: sortbyOptions[0].optionId,
        category: '',
        titleSearch: '',
        rating: '',
      },
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId, titleSearch} = this.state

    return (
      <div className='all-products-container'>
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          onSearchValue={this.onSearchValue}
          onSearch={this.onSearch}
          titleSearch={titleSearch}
        />
        <div className='filter-products-container'>
          <FiltersGroup
            categoryOptions={categoryOptions}
            ratingsList={ratingsList}
            updateCategory={this.updateCategory}
            updateRating={this.updateRating}
            onClearAll={this.onClearAll}
          />
          {productsList.length === 0 ? (
            this.noProducts()
          ) : (
            <ul className='products-list'>
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className='products-loader-container'>
      <Loader type='ThreeDots' color='#0b69ff' height='50' width='50' />
    </div>
  )

  render() {
    const {isLoading, hasError} = this.state

    return (
      <div className='all-products-section'>
        {isLoading
          ? this.renderLoader()
          : hasError
          ? this.onFailure()
          : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
