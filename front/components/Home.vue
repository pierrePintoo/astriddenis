<template>
  <div class="main bg-pink">
    <LandingBlock />
    <Section />
  </div>
</template>

<script>
import LandingBlock from "./LandingBlock/LandingBlock"
import Section from "./Timeline/Section"
export default {
  components: { Section },
  name: 'Home',
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
