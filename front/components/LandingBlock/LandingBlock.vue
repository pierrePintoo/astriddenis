<template>
    <div class="landing_block flex justify-between">
      <div class="absolute right-96 top-32">
          <img src="~/assets/astrid-head.svg" alt="Visage astrid" class="src">
      </div>
      <div class="landing_block--left flex flex-col justify-between">
        <a href="#" class="landing_block--left__top text-linkBig">Astrido</a>
        <div class="landing_block--left__center">
          <h1>Hello, c'est Astrido</h1>
          <h1>Je suis une communicante passionnée</h1>
        </div>
        <div class="landing_block--left__bottom group flex items-center cursor-pointer">
            <button class="btn landing_block--left__bottom__left"></button>
            <a href="#" class="ml-8 text-linkBig">Voir mes expériences</a>
        </div>
      </div>
      <div class="landing_block--right flex flex-col items-end">
        <div>
          <button class="btn">EN</button>
        </div>
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
  async beforeCreate () {
    try {
      this.articles = await this.$strapi.$articles.find()
      console.log(this.articles)
    } catch (error) {
      this.error = error
    }
    this.computeHeightBlock()
  },
  methods: {
    computeHeightBlock: function () {
        const block = document.querySelector('.landing_block')
        const paddingTop = 60
        block.style.height = `${window.innerHeight - paddingTop}px`

        window.addEventListener('resize', () => {
            block.style.height = `${window.innerHeight - paddingTop}px`
        })
    }
  }
}
</script>
<style scoped>
  .landing_block {
    padding-bottom: 6rem;
  }
  .nav {
    margin-top: 5.5rem;
    padding-right: 3.5rem;
  }

  .nav__item__right {
    right : 8.0625rem
  }

  .landing_page--left__top {
      margin-bottom: 13rem;
  }

  .landing_page--left__center {
      margin-bottom: 23.5rem;
  }

  .landing_block--left__bottom .landing_block--left__bottom__left{
    background: center no-repeat url('~/assets/icons/arrow-right.svg');
    background-size: 30%;
    transform: rotate(90deg);
  }

</style>
