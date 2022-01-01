<template>
  <div class="restaurant_select">
    <div class="restaurant_select_top">
      <div 
        @click="this.display = !this.display" 
        class="restaurant_select_top-header font-effect-outline"
      >{{ title ? title : 'Выберите ресторан' }}
      </div>
      <div class="arrow_picker">
        <div class="arrow_picker-up"></div>
        <div class="arrow_picker-down"></div>
      </div>
    </div>
    <div v-if="display" class="restaurant_select_bottom">
      <ul v-for="restaurant in restaurants" :key="restaurant.id">
        <li @click="getTitle(restaurant.title, restaurant.url)">{{restaurant.title}}</li>
      </ul>
    </div>
    <button @click="goToRestaurant(url)" v-if="title && !display">Переейти в ресторан</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {
      display: false,
      title: '',
      url: ''
    }
  },
  methods: {
    getTitle(title, url){
      this.title = title;
      this.url = url
      this.display = false
    },
    goToRestaurant(url){
      this.$router.push(`/restaurant/${url}`)
    },
  },
  computed: {
    ...mapState(['restaurants'])
  }
}
</script>
