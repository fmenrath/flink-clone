<template>
  <Header/>
  <div id="layout">
      <Sidebar/>
      <div class="product-wrapper">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import './style.scss'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar
  }
}
</script>