<template>
  <div class="home bg-pink w-screen h-screen">
    <LandingBlock />
  </div>
</template>

<script>
import LandingBlock from "./LandingBlock/LandingBlock"

export default {
  name: 'Home',
  data () {
    return {
    }
  },
}
</script>
<style scoped>
  .home {
    padding: 3.75rem 8.75rem 6rem 8.75rem;
  }
</style>
