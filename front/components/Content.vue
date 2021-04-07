<template>
    <div class="content">
        <LandingBlock :windowHeight = this.windowHeight />
        <Section :windowHeight = this.windowHeight />
        <Contact :windowHeight = this.windowHeight />
    </div>
</template>
<script>
    import LandingBlock from "./LandingBlock/LandingBlock"
    import Section from "./Timeline/Section"
    import Contact from "./Contact"
    
    export default {
        name: 'Content',
        components: { Section, Contact },
        props: ['windowHeight'],
        data () {
            return {
            }
        }
    }
</script>