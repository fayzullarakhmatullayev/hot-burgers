<template>
  <form class="burger-edit">
    <input 
      type="text" 
      name="name" 
      placeholder="Названия" 
      autocomplete="off"
      :value="burger.name"
      @input="handleChange($event)"
    >
    <input 
      type="text" 
      name="price" 
      placeholder="Цена" 
      autocomplete="off"
      :value="burger.price"
      @input="handleChange($event)"
    >
    <select class="status form-status" name="status" :value="burger.status" @change="handleChange($event)">
      <option value="" disabled>Выберите статус</option>
      <option value="available">Доступно</option>
      <option value="unavailable">Убрать из меню</option>
    </select>
    
    <textarea name="desc" placeholder="Описание" :value="burger.desc" @input="handleChange($event)"></textarea>
    <input 
      type="text" 
      name="image" 
      placeholder="Изображение" 
      autocomplete="off"
      :value="burger.image"
      @input="handleChange($event)"
    >
    <button type="submit" @click.prevent="$emit('handleDelete', index)">Удалить из меню</button>
  </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['burger', 'index'],
  computed: {
    getTitle(){
      return this.restaurants.filter(restaurant => restaurant.url === this.$route.params.url)
    },
  },
  methods: {
    ...mapActions(['updateBurger', 'getBurgers']),
    async handleChange(e){
      const updatedBurger = {
        ...this.burger,
        [e.currentTarget.name]: e.currentTarget.value,
      }
      const payload = {
        key: this.index,
        updatedBurger
      }
      await this.updateBurger(payload)
    },
  },
}
</script>

<style>

</style>