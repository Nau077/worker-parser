import { createStore } from 'vuex'
import axios from "axios"

const store = createStore({
  state: {
    sites: {}
  },

  mutations: {
   ADD_SITES(state, payload) {
      state.sites = payload
   }
  },
 
  actions: {
    async fetchSites({commit}) {
      console.log(123)
      let sites
      try {
        sites = await axios({
          url: 'http://localhost:4000/graphql',
          method: 'post',
          data: {
            query: `
              { fetchSites{
                name
                }
              }
              `
          }
        })

        commit("ADD_SITES", sites.data.data.fetchSites)
        return sites.data.data.fetchSites
      } catch (error) {
        console.error(error)
      }
    }
  }
})


export default store