<template>
  <div class="product-list-wrapper">
    <h2 class="product-list-header">Beliebtes Obst</h2>
    <div class="product-list">
      <div class="item" v-for="item in products" :key="item.id">
        <span class="item-name">{{item.product_name}}</span>
        <img :src="item.picture" class="item-image">
        <span v-if="item.discount==''" class="item-price-standard">{{formatPrice(item.price)}} €</span>
        <span v-if="item.discount!=''" class="item-price-old">{{formatPrice(item.price)}} €</span>
        <span v-if="item.discount!=''" class="item-price-discounted">{{formatPrice(item.price - item.discount)}} €</span>
        <div class="item-count-action">
          <button class="remove-item" v-if="itemInCart(item.id)" @click="removeFromCart(item.id)">−</button>
          <span class="item-count" v-if="itemInCart(item.id)" id="item-count">{{getQuantity(item.id)}}</span>
          <button class="add-item" @click="addToCart(item)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
    }
  },
  computed: {
    products(){
      return this.$store.getters.products
    },
    cart(){
      return this.$store.getters.cart
    }
  },
  methods: {
    addToCart(item){
      this.$store.dispatch("addItem", item);
    },
    removeFromCart(id){
      this.$store.dispatch("removeItem", id);
    },
    itemInCart(id) {
      return this.cart.find(o => o.id === id)
    },
    getQuantity(id){
      return this.cart.find(o => o.id === id).quantity
    },
    formatPrice(price){
      let roundedPrice = price.toFixed(2)
      return String(roundedPrice).replace(".", ",")
    }
  }
}
</script>
