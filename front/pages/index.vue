<template>
  <div class="container max-w-none" ref="container">
    <Home />
  </div>
</template>

<script>
import Home from "../components/Home"
export default {
  name: 'App',
  data () {
    return {
      articles: [],
      error: null
    }
  }
}
</script>
<style>
  .btn {
    @apply border border-black rounded-full h-14 w-14 focus:outline-none;
  }
</style>
