<template>
    <div class="content">
        <LandingBlock :windowHeight = this.windowHeight />
        <Section 
            v-for="experience in experiences"
            :key="experience.id"
            :title="experience.title"
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
        props: ['windowHeight'],
        data () {
            return {
                experiences: []
            }
        },
        async mounted () {
            try {
                // this.articles = await this.$strapi.$articles.find()
                this.experiences = await this.$strapi.$experiences.find()
                console.log('success' , this.experiences)
            } catch (error) {
                console.log('error')
                this.error = error
            }
        }
    }
</script>