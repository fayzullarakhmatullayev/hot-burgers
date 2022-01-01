<template>
  <li class="menu-burger">
    <div class="image-container">
      <img :src="details.image" :alt="details.name">
    </div>
    <div class="burger-details">
      <h3 class="burger-name">{{details.name}} <span class="price">{{details.price}} ₽</span></h3>
      <p>{{details.desc}}</p>
      <button 
        class="buttonOrder"
        :disabled="!isAvailable"
        @click="handleClick(index)"
      >{{ isAvailable ? 'Заказать' : 'Временно нет' }}</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['details', 'index'],
  methods: {
    handleClick(idx){
      this.$store.commit('ADD_TO_ORDER', idx)
    }
  },
  computed: {
    isAvailable(){
      return  this.details.status === 'available'
    }  
  }
}
</script>