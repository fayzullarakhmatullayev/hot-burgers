<template>
  <div class="order-wrap">
    <h2>Ваш Заказ</h2>
    <transition-group 
      tag="ul" 
      name="order" 
      class="order"
      v-if="isBurgers">
      <li v-for="(count, index) in order" :key="index">
        <div v-if="burgers[index] && burgers[index].status === 'available'">
          <span>
            <span>{{count}}</span>
            шт. {{ burgers[index].name }}
            <span>{{count * burgers[index].price}} ₽</span>
          </span>
          <button class="cancellItem" @click="deleteFromOrder(index)">&times;</button>
        </div>
        <div v-else class="unavailable">
          Извените, {{burgers[index] ? burgers[index].name : 'бургер'}} временно не доступен
        </div>
      </li>
    </transition-group>
    <shipment 
      v-if="total > 0" 
      :total="total"
      :shipping="total > 0 && total < 500 ? 350 : 99"
    />
    
    <div v-else class="nothingSelected">
      Выберите блюда и добавьте к заказу
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Shipment from './Shipment.vue'
export default {
  data(){
    return {
      isBurgers: true
    }
  },
  components: { Shipment },
  computed: {
    ...mapState(['burgers', 'order']),
    orderIds(){
      return Object.keys(this.order)
    },
    total(){
      return this.orderIds.reduce((prevTotal, key) => {
        const burger = this.burgers[key] ? this.burgers[key] : null
        const count = this.order[key]
        !burger ? this.isBurgers = false : this.isBurgers = true;
        const isAvailable = burger && burger.status === 'available'
        if(isAvailable){
          return prevTotal + burger.price * count
        }
        return prevTotal
      }, 0)
    },
  },
  methods:{
    ...mapActions(['setOrderEmpty', 'refreshOrder', 'deleteFromOrder']),
    getOrder(){
      const localStorageRef = localStorage.getItem(this.$route.params.url)
      if (localStorageRef) {
        this.refreshOrder(JSON.parse(localStorageRef))
      }
    }
  },
  watch:{
    total(total){
      localStorage.setItem(this.$route.params.url, JSON.stringify(this.order))
    }
  },
  created(){
    this.getOrder()
  },
  unmounted() {
    this.setOrderEmpty()
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>