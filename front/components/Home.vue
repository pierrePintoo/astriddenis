<template>
  <div class="home">
    <!-- <div v-if="error">
      {{ error }}
    </div>
    <ul v-else>
      <li v-for="article in articles" :key="article.id">
        {{ article.apropos }}
      </li>
    </ul> -->
    <div class="landing_page">
      <div class="landing_page--left">
        <a href="#">Astrido</a>
        <div>
          <h1>Hello, c'est Astrido</h1>
          <h2>Je suis une communicante passionnée</h2>
        </div>
        <div>
          <span>Button</span>
          <a href="#">Check my experiences</a>
        </div>
      </div>
      <div class="landing_page--right">
        <button class="button__top">En</button>
        <div class="nav">
          <ul>
            <li class="nav__item">Home</li>
            <li class="nav__item">My experiences</li>
            <li class="nav__item">Contact me</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
<style scoped>
</style>
