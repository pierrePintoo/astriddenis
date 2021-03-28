<template>
  <div class="container max-w-none">
    <Home />
  </div>
</template>

<script>
import Home from "../components/Home"
export default {
  name: 'App',
  data () {
    return {
      articles: [],
      error: null
    }
  },
  async mounted () {
    try {
      this.articles = await this.$strapi.$articles.find()
      console.log(this.articles)
    } catch (error) {
      this.error = error
    }
  }
}
</script>
