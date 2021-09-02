const state = () => ({
    language: 'fr',
    colors: {
      pink: '#FFBFBF'
    }
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