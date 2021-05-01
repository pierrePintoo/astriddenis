<template>
  <div id="contact" class="contact pr-4 h-screen">
    <div class="contact__left h-full flex flex-col">
        <a href="#" class="contact__left__top text-linkBig mb-20">Astrido</a>
        <div class="contact__left__center">
          <h2 class="mb-20">{{ contactContent.catch_phrase }}</h2>
          <h1 class="underline"><a href="mailto:astriddns@gmail.com">{{ contactContent.Email }}</a></h1>
          <h1 class="underline"><a :href="'tel:' + contactContent.telephone">{{ contactContent.telephone }}</a></h1>
        </div>
        <p class="contact__left__bottom text-linkBig mt-auto mb-24">{{ contactContent.place }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'Contact',
  data () {
    return {
      contactContent: [] 
    }
  },
  async beforeMount () {
    let response = this.getDatas('http://localhost:1337/contact')
    response.then( value => this.contactContent = value )
    this.$store.watch(() => {
      if(this.$store.state.language === 'en') {
          let response = this.getDatas('http://localhost:1337/contact?_locale=en')
          response.then( value => this.contactContent = value )
        } else if (this.$store.state.language === 'fr') {
          let response = this.getDatas('http://localhost:1337/contact')
          response.then( value => this.contactContent = value )
        }
    })
  },
  methods: {
    getDatas: async function(url) {
      try {
          const response = await axios.get(url)
          return response.data
      } catch (error) {
          console.log(error)
      }
    }
  }
}
</script>
<style scoped>
  .contact {
    padding-top: 3.75rem;
  }
</style>
