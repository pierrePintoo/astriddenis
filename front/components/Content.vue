<template>
    <div class="content">
        <LandingBlock :windowHeight = this.windowHeight />
        <Section 
            v-for="experience in experiences"
            :key="experience.id"
            :id="experience.id"
            :title="experience.title"
            :images="experience.images"
            :audio="experience.enregistrement"
        />
        <Contact />
    </div>
</template>
<script>
    import LandingBlock from "./LandingBlock/LandingBlock"
    import Section from "./Timeline/Section"
    import Contact from "./Contact"
    
    export default {
        name: 'Content',
        components: { Section, Contact },
        props: ['windowHeight', 'experiences'],
    }
</script>