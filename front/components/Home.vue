<template>
  <div class="main flex bg-pink">
    <Content :sectionHeight = windowHeight />
    <Bar :barHeight = windowHeight />
  </div>
</template>

<script>
import Content from "./Content"
import Bar from "./Timeline/Bar"

export default {
  name: 'Home',
  components: { Bar },
  data () {
    return {
      windowWidth: null,
      windowHeight: null
    }
  },
  async mounted () {
    this.computeHeightWindow()
},
methods: {
    computeHeightWindow: function () {
        // First loading page
        const paddingTop = 60

        this.windowHeight = `${window.innerHeight - paddingTop}px`

        window.addEventListener('resize', () => {
            this.windowHeight = `${window.innerHeight - paddingTop}px`
        })
    }
  }
}
</script>
<style scoped>
  .main {
    padding: 3.75rem 8.75rem 0 8.75rem;
  }
</style>
