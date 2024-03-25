// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => {
  ;<CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.foreach(each => {
        total += each.price * each.quantity
      })

      return (
        <>
          <div>
            <h1>
              <span>Order Total</span>Rs {total}/-
            </h1>
            <p>{cartList.length} Items in cart</p>
            <button type="button">CheckOut</button>
            <div>
              <button type="button">CheckOut</button>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
}

export default CartSummary
