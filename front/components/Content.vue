<template>
    <div class="content">
        <LandingBlock :windowHeight = this.windowHeight />
        <Section :windowHeight = this.windowHeight />
    </div>
</template>
<script>
    import LandingBlock from "./LandingBlock/LandingBlock"
    import Section from "./Timeline/Section"
    
    export default {
        name: 'Content',
        components: { Section },
        props: ['windowHeight'],
        data () {
            return {
            }
        }
    }
</script>