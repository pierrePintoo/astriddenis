<template>
  <div class="section border-l border-black h-screen flex flex-col justify-between pb-14">
    <div class="section__top">
      <span class="section__bullet btn bg-pink block absolute"></span>
      <h2 class="section__title ml-16 text-big">{{ title }}</h2>
    </div>
    <div class="section__img">
      <img class="section__img__item" src="~/assets/img/Scan.jpeg" alt="" />
    </div>
    <div class="section__bottom flex align-center">
      <button class="btn section__bottom__left ml-14">
        <play-button  width="22" height="22" class="pl-1" style="margin: auto;"/>
      </button>
      <a href="#" class="ml-6 text-linkBig">Écouter mes souvenirs</a>
    </div>
  </div>
</template>

<script>
import PlayButton from '../Icons/PlayButton.vue'

export default {
  name: 'Section',
  props: ["windowHeight", "title"],
  components: { PlayButton },
  data () {
    return {
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
    transform: rotate(75deg);
    position: relative;
    left: 100px;
  }
</style>
