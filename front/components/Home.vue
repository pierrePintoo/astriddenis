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
  async mounted () {
    this.launchResizeListener()

    try {
        // this.articles = await this.$strapi.$articles.find()
        const response = await axios.get('http://localhost:1337/experiences?_locale=en')
        this.experiences = response.data
        console.log('success', this.experiences)
    } catch (error) {
        console.log(error)
        this.error = error
    }
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
      }
    }
}
</script>
<style scoped>
  .main {
    padding: 3.75rem 8.75rem 0 8.75rem;
  }
</style>
