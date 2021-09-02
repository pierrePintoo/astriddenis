<template>
    <div :style="{height: `${this.windowHeight - 60}px`}" id="landing_block" class="landing_block pb-14 pr-4">
      <div class="absolute right-96 top-32">
          <!-- <img src="~/assets/astrid-head.svg" alt="Visage astrid" class="src"> -->
      </div>
      <div class="landing_block--left h-full flex flex-col justify-between">
        <a href="#" class="landing_block--left__top text-linkBig">{{ homeContent.title }}</a>
        <div class="landing_block--left__center">
          <h1>{{ homeContent.presentation }}</h1>
          <h1>{{ homeContent.catch_phrase }}</h1>
        </div>
        <div @click="onButtonClick()" class="landing_block--left__bottom group flex items-center cursor-pointer">
            <button class="btn absolute landing_block--left__bottom__left">
              <ArrowRight width="20" height="20" class="" style="margin: auto; transform:rotate(90deg)"/>
            </button>
            <span href="" class="ml-14 text-linkBig">{{ homeContent.label_cta }}</span>
        </div>
      </div>
    </div>
</template>

<script>
import ArrowRight from '~/components/Icons/ArrowRight.vue'
import axios from "axios"
import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

export default {
  name: 'LandingBlock',
  components: {
    ArrowRight
  },
  props: ['windowHeight'],
  data () {
    return {
      articles: [],
      error: null,
      homeContent: []
    }
  },
  async beforeMount () {
    let response = this.getDatas('http://localhost:1337/accueil')
    response.then( value => { this.homeContent = value } )
    this.$store.watch(() => {
      if(this.$store.state.language === 'en') {
          let response = this.getDatas('http://localhost:1337/accueil?_locale=en')
          response.then( value => this.homeContent = value )
        } else if (this.$store.state.language === 'fr') {
          let response = this.getDatas('http://localhost:1337/accueil')
          response.then( value => this.homeContent = value )
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
    },
    onButtonClick: function() {
      gsap.killTweensOf(window)
      gsap.to(window, {duration: 1, scrollTo: ".section", ease: "power4.inOut"})

    }
  }
}
</script>
<style scoped>
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
