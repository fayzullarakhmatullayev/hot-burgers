<template>
  <div class="burger-paradise">
    <div class="menu">
      <Header 
        :title="getTitle[0].title"
      />
      <ul class="burgers">
        <Burger 
          v-for="(burger, index) in burgers"
          :key="index"
          :index="index"
          :details="burger"
        />
      </ul>
    </div>
    <Order />
    <MenuAdmin 
      @handleDelete="handleDelete"
    />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import MenuAdmin from '../components/MenuAdmin.vue'
import Order from '../components/Order.vue'
import Burger from '../components/Burger.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {Header, MenuAdmin, Order, Burger},
  computed: {
    ...mapState(['restaurants', 'burgers']),
    getTitle(){
      return this.restaurants.filter(restaurant => restaurant.url === this.$route.params.url)
    },
  },
  methods: {
    ...mapActions(['getBurgers', 'deleteBurgers']),
    async handleDelete(index){
      await this.deleteBurgers(index)
      await this.getBurgers(this.getTitle[0].url)
    }
  },
  async created(){
    await this.getBurgers(this.getTitle[0].url)
  },
}
</script>