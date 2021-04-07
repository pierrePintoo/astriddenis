<template>
  <div :style="{height: `${this.windowHeight}px`}" class="contact pr-4">
    <div class="contact__left h-full flex flex-col">
        <a href="#" class="contact__left__top text-linkBig mb-20">Astrido</a>
        <div class="contact__left__center">
          <h2 class="mb-20">Vous pouvez me joindre, mais soyez gentils.</h2>
          <h1 class="underline"><a href="mailto:astriddns@gmail.com">astriddns@gmail.com</a></h1>
          <h1 class="underline"><a href="tel:+33 6 87 50 43 56">+33 6 87 50 43 56</a></h1>
        </div>
        <p class="contact__left__bottom text-linkBig mt-auto mb-24">Paris</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Contact',
  props: ["windowHeight"],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
  .contact {
    padding-top: 3.75rem;
  }
</style>
