<template>
    <div class="content">
        <LandingBlock />
        <Section />
    </div>
</template>
<script>
    import LandingBlock from "./LandingBlock/LandingBlock"
    import Section from "./Timeline/Section"
    
    export default {
        name: 'Content',
        components: { Section },
        props: ['sectionHeight'],
        data () {
            return {
            }
        },
        async mounted () {
            this.computeHeightBlock()
        },
        methods: {
            computeHeightBlock: function () {
                console.log('wesheu : ', this.sectionHeight)
                let childrens = document.querySelector('.content').children

                // First loading page

                for(let i = 0; i < childrens.length; i++){
                    childrens[i].style.height = this.sectionHeight
                }
            }
        }
    }
</script>