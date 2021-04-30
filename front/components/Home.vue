<template>
  <div class="main flex justify-between bg-pink">
    <Content :windowHeight = windowHeight :experiences = experiences />
    <Bar :barHeight = windowHeight :experiences = experiences />
  </div>
</template>

<script>
import Content from "./Content"
import Bar from "./Timeline/Bar"
import axios from "axios"

export default {
  name: 'Home',
  components: { Bar },
  data () {
    return {
      windowWidth: null,
      windowHeight: window.innerHeight,
      experiences: []
    }
  },
  async beforeMount () {
    this.launchResizeListener()
    let response = this.getDatas('http://localhost:1337/experiences')
    response.then( value => this.experiences = value )
    this.$store.watch(() => {
      if(this.$store.state.language === 'en') {
          let response = this.getDatas('http://localhost:1337/experiences?_locale=en')
          response.then( value => this.homeContent = value )
        } else if (this.$store.state.language === 'fr') {
          let response = this.getDatas('http://localhost:1337/experiences')
          response.then( value => this.homeContent = value )
        }
    })
  },
  async updated () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been re-rendered
      this.computeHeightWindow()
    })
  },
  methods: {
      computeHeightWindow: function () {
          // First loading page
          this.windowHeight = window.innerHeight
      },
      launchResizeListener: function () {
          window.addEventListener('resize', () => {
              this.windowHeight = window.innerHeight
          })
      },
      getDatas: async function(url) {
        try {
            // this.articles = await this.$strapi.$articles.find()
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            console.log(error)
        }
      }
    },
}
</script>
<style scoped>
  .main {
    padding: 3.75rem 8.75rem 0 8.75rem;
  }
</style>
