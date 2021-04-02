<template>
    <div class="content">
        <LandingBlock />
        <Section :width={width} :height={height} />
    </div>
</template>
<script>
    import LandingBlock from "./LandingBlock/LandingBlock"
    import Section from "./Timeline/Section"
    
    export default {
        name: 'Content',
        components: { Section },
        data () {
            return {
                height: null
            }
        },
        async mounted () {
            this.computeHeightBlock()
        },
        methods: {
            computeHeightBlock: function () {
                const paddingTop = 60

                let childrens = document.querySelector('.content').children

                window.addEventListener('resize', () => {
                    this.height = `${window.innerHeight - paddingTop}px`
                    for(let i = 0; i < childrens.length; i++){
                        childrens[i].style.height = this.height
                        console.log('cc', childrens[0].style.height)
                    }
                })
            }
        }
    }
</script>