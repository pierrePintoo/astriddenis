<template>
  <div class="main flex bg-pink">
    <Content />
    <Bar />
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
    }
  }
}
</script>
<style scoped>
  .main {
    padding: 3.75rem 8.75rem 0 8.75rem;
  }
</style>
