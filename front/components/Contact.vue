<template>
  <div :style="{height: `${this.windowHeight}px`}" class="contact">
      <h1>Contact</h1>
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
</style>
