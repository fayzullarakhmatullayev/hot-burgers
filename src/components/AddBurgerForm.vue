<template>
  <form class="burger-edit" @submit.prevent="createBurger($event)">
    <input 
      type="text" 
      name="name" 
      placeholder="Названия" 
      autocomplete="off"
      v-model="name"
    >
    <input 
      type="text" 
      name="price" 
      placeholder="Цена" 
      autocomplete="off"
      v-model="price"
    >
    <select class="status form-status" name="status" v-model="status">
      <option value="" disabled>Выберите статус</option>
      <option value="available">Доступно</option>
      <option value="unavailable">Убрать из меню</option>
    </select>
    
    <textarea name="desc" placeholder="Описание" v-model="desc"></textarea>
    <input 
      type="text" 
      name="image" 
      placeholder="Изображение" 
      autocomplete="off"
      v-model="image"
    >
    <button type="submit">+ Добавить в меню</button>
  </form>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  data(){
    return {
      name: '',
      price: '',
      status: '',
      desc: '',
      image: '',
    }
  },
  computed: {
    ...mapState(['restaurants']),
    getTitle(){
      return this.restaurants.filter(restaurant => restaurant.url === this.$route.params.url)
    },
  },
  methods: {
    ...mapActions(['postBurgers', 'getBurgers']),
    async createBurger(e){
      const burger = {
        name: this.name,
        price: parseFloat(this.price) || 0,
        status: this.status,
        desc: this.desc,
        image: this.image,
      }
      e.target.reset()
      await this.postBurgers(burger)
      await this.getBurgers(this.getTitle[0].url)
    }
  },
}
</script>

<style scoped>
.form-status{
  color: #5e636e;
}
.form-status option:first-child{
  display: none;
}
</style>