import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    async fetchSites() {
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
      } catch (error) {
        
      }
    }
  },
  modules: {
  }
})
