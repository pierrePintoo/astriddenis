<template>
  <div class="section border-l border-black h-screen flex flex-col justify-between pb-14">
    <div class="section__top">
      <span class="section__bullet btn bg-pink block absolute"></span>
      <h2 class="section__title ml-16 text-big">{{ title }}</h2>
    </div>
    <div class="section__img">
      <img v-for="image in images" :key="image.id" :src="'http://localhost:1337' + image.url" class="section__img__item" alt="" />
    </div>
    <div class="section__bottom flex align-center">
      <button class="btn section__bottom__left ml-14">
        <play-button width="22" height="22" class="pl-1" style="margin: auto;" :audioURL="audio.url"/>
      </button>
      <a href="#" class="ml-6 text-linkBig">Écouter mes souvenirs</a>
    </div>
  </div>
</template>

<script>
import PlayButton from '../Icons/PlayButton.vue'

export default {
  name: 'Section',
  props: ["windowHeight", "title", "images", "audio"],
  components: { PlayButton },
  data () {
    return {
    }
  },
  methods: {
    logImages: function() {
      console.log(this)
    }
  }
}
</script>
<style scoped>
  .section {
    padding-top: 3.75rem;
  }

  .section__bullet {
    left: 112px;
  }

  .section__img__item {
    height: 200px;
    transform: rotate(-45deg);
    position: relative;
    left: 100px;
  }
</style>
