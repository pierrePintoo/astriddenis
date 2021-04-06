<template>
    <div class="landing_block h-screen">
      <div class="absolute right-96 top-32">
          <!-- <img src="~/assets/astrid-head.svg" alt="Visage astrid" class="src"> -->
      </div>
      <div class="landing_block--left h-full flex flex-col justify-between">
        <a href="#" class="landing_block--left__top text-linkBig">Astrido</a>
        <div class="landing_block--left__center">
          <h1>Hello, c'est Astrido</h1>
          <h1>Je suis une communicante passionnée</h1>
        </div>
        <div class="landing_block--left__bottom group flex items-center cursor-pointer">
            <button class="btn absolute landing_block--left__bottom__left">
              <ArrowRight  width="20" height="20" class="" style="margin: auto; transform:rotate(90deg)"/>
            </button>
            <a href="#" class="ml-14 text-linkBig">Voir mes expériences</a>
        </div>
      </div>

    </div>
</template>

<script>
import ArrowRight from '~/components/Icons/ArrowRight.vue';

export default {
  name: 'LandingBlock',
  components: {
    ArrowRight
  },
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
  },
}
</script>
<style scoped>
  .landing_block {
    padding-bottom: 6.175rem;
  }

  .landing_page--left__top {
      margin-bottom: 13rem;
  }

  .landing_page--left__center {
      margin-bottom: 23.5rem;
  }

  .landing_block--right__top {
    position: relative;
    left: 12px;
  }

  .landing_block--left__bottom__left {
    left: 112px;
  }

</style>
