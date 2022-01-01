import { createStore } from 'vuex'
import restaurants from '../api/sample-restaurants.json'

export default createStore({
  state: {
    restaurants,
    burgers: {},
    order: {},
    url: null
  },
  mutations: {
    SET_RESTAURANTS(state, restaurants){
      state.restaurants = restaurants
    },
    SET_ORDER(state, order){
      state.order = order
    },
    COPY_BURGERS(state, burgers){
      state.burgers = burgers
    },
    ADD_TO_ORDER(state, key){
      const order = state.order
      order[key] = order[key] + 1 || 1
    },
    SET_URL(state, url){
      state.url = url
    },
  },
  actions: {
    async getBurgers({commit}, url){
      try {
        await fetch(`https://vue-hot-burgers-default-rtdb.firebaseio.com/${url}/burgers.json`)
        .then(res => res.json())
        .then(data => {
          commit('COPY_BURGERS', data)
          commit('SET_URL', url)
        })
      } catch (e) {console.warn(e.message)}
      
    },
    async postBurgers({state}, payload){
      try {
        await fetch(`https://vue-hot-burgers-default-rtdb.firebaseio.com/${state.url}/burgers.json`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        })
      } catch (e) {console.warn(e.message);}
    },
    setOrderEmpty({commit}){
      commit('SET_ORDER', {})
    },
    refreshOrder({commit}, payload){
      commit('SET_ORDER', payload)
    },
    async updateBurger({commit, state}, {key, updatedBurger}){
      const burgers = state.burgers
      burgers[key] = updatedBurger
      try {
        await fetch(`https://vue-hot-burgers-default-rtdb.firebaseio.com/${state.url}/burgers.json`, {
          method: 'PUT',
          body: JSON.stringify(burgers),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        })
        commit('COPY_BURGERS', burgers)
      } catch (e) {console.warn(e.message)}
    },
    async deleteBurgers({state, commit}, index){
      const order = state.order
      delete order[index]
      try {
        await fetch(`https://vue-hot-burgers-default-rtdb.firebaseio.com/${state.url}/burgers/${index}.json`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        })
      commit('SET_ORDER', order)
      } catch (e) {console.warn(e.message)}
    },
    deleteFromOrder({state, commit}, index){
      const order = state.order
      delete order[index]
      commit('SET_ORDER', order)
    }
  },
})
