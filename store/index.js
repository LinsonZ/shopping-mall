/*
 * @Author: zhoulin
 * @Date: 2020-04-22 15:45:05
 * @LastEditors: your name
 * @LastEditTime: 2020-05-01 15:14:44
 * @Description: file content
 */
// import Vue from 'vue'
// import Vuex from 'vuex'
// import geo from './modules/geo'
// import home from './modules/home'

// Vue.use(Vuex)

// const store = () => new Vuex.Store({
//   modules: {
//     geo,
//     home
//   },
//   actions: {
//     // nuxt中生命周期
//     async nuxtServerInit ({ commit }, { req, app }) {
//       const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
//       commit('geo/setPosition', status === 200 ? { province, city } : { province: '', city: '' })

//       const { status: status2, data: { menu } } = await app.$axios.get('/geo/menu')
//       commit('home/setMenu', status2 === 200 ? menu : [])
//     }
//   }
// })
// export default store
// import vuexPersistedstate from 'vuex-persistedstate'
// export const plugins = {
//   vuexPersistedstate({
//     storage:sessionStorage
//   })(store)
// }
export const actions = {
  // nuxt中生命周期
  async nuxtServerInit ({ commit }, { req, app }) {
    const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
    commit('geo/setPosition', status === 200 ? { province, city } : { province: '', city: '' })

    const { status: status2, data: { menu } } = await app.$axios.get('/geo/menu')
    commit('home/setMenu', status2 === 200 ? menu : [])

    const { status: status3, data: { result } } = await app.$axios.get('search/hotPlace', {
      params: {
        city: app.store.state.geo.position.city.replace('市', '')
      }
    })
    commit('home/setHotPlace', status3 === 200 ? result : [])
  }
}
