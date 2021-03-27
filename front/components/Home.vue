<template>
  <div class="home bg-pink w-screen h-screen">
    <!-- <div v-if="error">
      {{ error }}
    </div>
    <ul v-else>
      <li v-for="article in articles" :key="article.id">
        {{ article.apropos }}
      </li>
    </ul> -->
    <div class="h-full landing_page flex justify-between">
      <div class="landing_page--left h-full flex flex-col justify-between">
        <a href="#" class="text-linkBig">Astrido</a>
        <div>
          <h1>Hello, c'est Astrido</h1>
          <h1>Je suis une communicante passionnée</h1>
        </div>
        <div>
          <span>Button</span>
          <a href="#" class="text-linkBig">Check my experiences</a>
        </div>
      </div>
      <div class="landing_page--right flex flex-col items-end">
        <button class="button__top text-small border border-black rounded-full h-16">En</button>
        <div class="nav border-r border-black h-full">
          <ul class="h-full flex flex-col justify-between items-end">
            <li class="nav__item text-small"><a href="#">Home</a></li>
            <li class="nav__item text-small"><a href="#">Mes expériences</a></li>
            <li class="nav__item text-small"><a href="#">Contact</a></li>
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
  .home {
    padding: 3.75rem 8.75rem 6rem 8.75rem;
  }

  .nav {
    margin-top: 5.5rem;
    padding-right: 3.5rem;
  }

  .button__top {
    width: 3.375rem;
  }
</style>
