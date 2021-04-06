<template>
  <div class="main flex justify-between bg-pink">
    <Content :windowHeight = windowHeight />
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
      windowHeight: window.innerHeight,
      paddingTop: 60
    }
  },
  async mounted () {
    this.launchResizeListener()
  },
  async updated () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been re-rendered
      this.computeHeightWindow()
    })
  },
  methods: {
      computeHeightWindow: function () {
          // First loading page

          this.windowHeight = `${window.innerHeight - this.paddingTop}px`
      },
      launchResizeListener: function () {
          window.addEventListener('resize', () => {
              this.windowHeight = `${window.innerHeight - this.paddingTop}px`
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
