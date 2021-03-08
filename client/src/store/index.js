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
      let sites
      try {
        sites = await axios({
          url: 'http://localhost:4000/graphql',
          method: 'post',
          data: {
            query: `
              query PostsForAuthor {
                author(id: 1) {
                  firstName
                    posts {
                      title
                      votes
                    }
                  }
                }
              `
          }
        })

        console.log(sites)
        commit("ADD_SITES", sites)
      } catch (error) {
        console.error(error)
      }
    }
  }
})


export default store