import { createStore } from 'vuex'
import fruitList from '../fruit.json'

export default createStore({
  
  state: {
    products: fruitList,
    cart: [],
    cartValue: 0,
    cartLength: 0
  },

  getters: {
    products: (state) => state.products,
    cart: (state) => state.cart,
    cartValue: (state) => state.cartValue,
    cartLength: (state) => state.cartLength
  },

  mutations: {
    ADD_Item(state, item) {
      let itemInCart = state.cart.find(o => o.id === item.id)
      //if item in cart: only update the quantity
      if(itemInCart){
        itemInCart.quantity +=1
      }
      //if item not in cart: push the item
      else{
        state.cart.push({"id": item.id, "quantity": 1, "price":item.price-item.discount, "discount": item.discount, "picture": item.picture, "name": item.product_name})
      }
      console.log(state.cart)
      //Update cart value
      state.cartValue = 0
      state.cart.forEach(element => {
        state.cartValue += element.price * element.quantity
      });
      //Update cart length
      state.cartLength+=1
    },
    REMOVE_Item(state, id) {
      let itemInCart = state.cart.find(o => o.id === id)
      //if more than one of a item is left in cart: only lower the quantity
      if(itemInCart.quantity > 1){
        itemInCart.quantity -= 1
      }
      //if only one item left: completely delete the item from the cart
      else{
        state.cart = state.cart.filter(function(obj) {
          return obj.id !== id;
        })
      }
      //Update cart value
      state.cartValue = 0
      state.cart.forEach(element => {
        state.cartValue += element.price * element.quantity
      });
      //Update cart length
      state.cartLength-=1
    }
  },

  actions: {
    addItem(context, item) {
      context.commit("ADD_Item", item);
    },
    removeItem(context, id) {
      context.commit("REMOVE_Item", id);
    }
  }
})
