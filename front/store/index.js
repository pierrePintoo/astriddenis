const state = () => ({
    language: 'fr'
  })
  
  const actions = {
  }
  
  const mutations = {
    switchLanguage (state, resp) {
      state.language = resp
    }
  }
  
  export default {
    state,
    actions,
    mutations
  }