<template>
    <div class="h-full landing_block flex justify-between">
      <div class="absolute right-96 top-32">
          <img src="~/assets/astrid-head.svg" alt="Visage astrid" class="src">
      </div>
      <div class="landing_page--left h-full flex flex-col justify-between">
        <a href="#" class="text-linkBig">Astrido</a>
        <div>
          <h1>Hello, c'est Astrido</h1>
          <h1>Je suis une communicante passionnée</h1>
        </div>
        <div class="group flex items-center cursor-pointer">
          <button class="border border-black rounded-full h-20 w-20"><img src="~/assets/icons/arrow-right.svg" alt="" class="w-8 m-auto transform rotate-90 group-hover:translate-y-2 transition duration-200"></button>
          <a href="#" class="ml-8 text-linkBig">Check my experiences</a>
        </div>
      </div>
      <div class="landing_page--right flex flex-col items-end">
        <button class="button__top text-small border border-black rounded-full h-16">En</button>
        <div class="nav border-r border-black h-full">
          <ul class="h-full flex flex-col justify-between items-end">
            <li class="nav__item text-small flex items-center"><a href="#" class="font-bold">Home</a><span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-black mb-1"></span></li>
            <li class="nav__item text-small flex items-center"><a href="#">Mes expériences</a><span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink"></span></li>
            <li class="nav__item text-small flex items-center"><a href="#">Contact</a><span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mt-1"></span></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'LandingBlock',
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
  .nav {
    margin-top: 5.5rem;
    padding-right: 3.5rem;
  }

  .nav__item__right {
    right : 8.0625rem
  }

  .button__top {
    width: 3.375rem;
  }
</style>
