<template>
  <header>
    <div class="header-wrapper">
      <div class="logo-wrapper">
        <img src="../assets/logo.svg" alt="Flink Logo" id="logo">
      </div>
      <div class="search-wrapper">
        <div class="search">
          <img src="../assets/search.svg" alt="Suche Logo" id="search-icon">
          <input type="text" id="search-input" placeholder="Suche...">
        </div>
      </div>
      <div class="nav-wrapper">
        <img v-if="cartLength==0" src="../assets/cart.svg" alt="Cart Logo" class="nav-icon" @click="toggleCartPreview()">
        <div v-else class="cart-button">
          <div class="cart-button-info" @click="toggleCartPreview()">
            <span class="cart-value">{{formatPrice(cartValue)}} €</span>
            <span class="cart-item-count">{{cartLength}} Artikel</span>
          </div>
          <img src="../assets/cart.svg" alt="Cart Logo" class="nav-icon" @click="toggleCartPreview()">
        </div>
        <img src="../assets/user.svg" alt="Profile Logo" class="nav-icon">
        <div class="cart-preview hidden" id="cart-preview">
          <h2>Ihr Einkaufswagen</h2>
          <div class="item-list">
            <div class="cart-item" v-for="item in cart" :key="item.id">
              <img :src="item.picture" alt="" class="item-img-small">
              <span class="item-name">{{item.name}}</span>
              <div class="item-amount">
                <button class="remove-item" @click="removeFromCart(item.id)">−</button>
                <span class="item-count" id="item-count">{{getQuantity(item.id)}}</span>
                <button class="add-item" @click="addToCart(item)">+</button>
              </div>
              <span class="item-price">{{formatPrice(item.price*item.quantity)}} €</span>
            </div>
          </div>
          <div class="cart-total">
            <span class="total-sum-text">Gesamtsumme</span>
            <span class="total-value">{{formatPrice(cartValue)}} €</span>
          </div>
          <div class="pay-now">
            <button class="pay-now-btn">Jetzt bezahlen</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
export default{
  name: 'Header',
  computed: {
    products(){
      return this.$store.getters.products
    },
    cart(){
      return this.$store.getters.cart
    },
    cartValue(){
      return this.$store.getters.cartValue
    },
    cartLength(){
      return this.$store.getters.cartLength
    }
  },
  methods:{
    addToCart(item){
      this.$store.dispatch("addItem", item);
    },
    removeFromCart(id){
      this.$store.dispatch("removeItem", id);
    },
    formatPrice(price){
      let roundedPrice = price.toFixed(2)
      return String(roundedPrice).replace(".", ",")
    },
    toggleCartPreview(){
      let cartPreview = document.getElementById("cart-preview")
      let layout = document.getElementById("layout")
      if(cartPreview.classList.contains("hidden")){
        cartPreview.classList.remove("hidden")
        layout.classList.add("halfOpacity")
      }
      else{
        cartPreview.classList.add("hidden")
        layout.classList.remove("halfOpacity")
      }
    },
    getQuantity(id){
      return this.cart.find(o => o.id === id).quantity
    }
  }
}
</script>
