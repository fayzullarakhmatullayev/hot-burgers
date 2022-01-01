<template>
  <div class="menu-admin">
    <h2>Управления Меню</h2>
    <div v-for="(key, index) in burgers" :key="index">
      <edit-burger-form 
        :burger="burgers[index]"
        :index="index"
        @handleDelete="$emit('handleDelete', index)"
      />
    </div>
    <add-burger-form />
  </div>
</template>

<script>
import addBurgerForm from './AddBurgerForm.vue'
import editBurgerForm from './EditBurgerForm.vue'

import {mapState} from 'vuex'
export default {
  components: {addBurgerForm, editBurgerForm},
  computed: {
    ...mapState(['burgers']),
  }, 
}
</script>

<style>

</style>