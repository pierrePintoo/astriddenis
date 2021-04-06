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
    } catch (error) {
      this.error = error
    }
  }
}
</script>
<style>
  .btn {
    @apply border border-black rounded-full h-14 w-14;
  }
</style>
