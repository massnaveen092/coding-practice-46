import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItem = () => {
    this.setState({
      cartList: [],
    })
  }

  incrementItemQuantity = id => {
    this.setState(prevstate => ({
      cartList: prevstate.cartList.map(each => {
        if (id === each.id) {
          const updateQuantity = each.quantity + 1
          return {...each, quantity: updateQuantity}
        }
        return each
      }),
    }))
  }

  decrementItemQuantity = id => {
    const {cartList} = this.state
    const productObj = cartList.find(each => each.id === id)
    if (productObj.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (id === each.id) {
            const updateQuantity = each.quantity - 1
            return {...each, quantity: updateQuantity}
          }
          return each
        }),
      }))
    } else {
      this.removeAllCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updateCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updateCartList})
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productObj = cartList.find(each => each.id === product.id)

    if (productObj) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (productObj.id === each.id) {
            const updateQuantity = each.quantity + product.quantity

            return {...each, quantity: updateQuantity}
          }
          return each
        }),
      }))
    } else {
      const updateCartList = [...cartList, product]

      this.setState({cartList: updateCartList})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementItemQuantity: this.incrementItemQuantity,
          decrementItemQuantity: this.decrementItemQuantity,
          removeAllCartItem: this.removeAllCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
