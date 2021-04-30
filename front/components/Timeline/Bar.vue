<template>
      <div :style="{height: `${this.barHeight - 60}px`}" class="bar flex flex-col items-end pb-14 sticky">
        <div>
          <button class="btn bar__top relative pr-1">EN</button>
        </div>
        <div class="nav border-r border-black">
          <ul class="h-full flex flex-col justify-between items-end">
            <li @click.stop="onLandingBlockClick()" class="nav__item nav__item--first text-small flex items-center"><a href="#landingBlock" class="font-bold">Home<span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mb-1" :class="{active: isActive.landingBlock}"></span></a></li>
            <li @click.stop="onExperiencesClick()" v-if="!showExperiences" class="nav__item text-small flex items-center"><a href="#section1">Mes expériences <span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mb-1" ></span></a></li>
            <li v-if="showExperiences" v-for="experience in experiences" :key="experience.id" class="nav__item text-small flex items-center"><a href="#section1">{{ experience.title }} <span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mb-1" ></span></a></li>
            <li @click.stop="onContactClick()" class="nav__item nav__item--last text-small flex items-center"><a href="#contact">Contact<span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mt-1" :class="{active: isActive.contact}"></span></a></li>
          </ul>
        </div>
      </div>
</template>

<script>
    export default {
        name: 'Bar',
        props: ["barHeight", "experiences"],
        data () {
            return {
                isActive: {
                    landingBlock: true,
                    contact: false
                },
                showExperiences: false
            }
        },
        methods: {
            onLandingBlockClick: function() {
                this.resetActivesClass()
                this.showExperiences = false
                this.isActive.landingBlock = true
            },
            onExperiencesClick: function() {
                this.showExperiences = true
            },
            onContactClick: function() {
                this.resetActivesClass()
                this.isActive.contact = true
            },
            resetActivesClass: function() {
                Object.keys(this.isActive).forEach( item => this.isActive[item] = false)
            }
        },
        async mounted () {
            // console.log('wesheu : ', barHeight)
        }
    }
</script>

<style scoped>
    .bar {
        top: 60px;
    }

    .bar__top {
        left: 28px;
    }

    .nav {
        height: 100%;
        margin-top: 5.5rem;
        padding-right: 3.5rem;
    }

    .nav__item__right {
        right: -12px;
    }

    .active {
        background: #000;
    }

    /* .nav__item::after {
        position: absolute;
        content: '';
        width: 20px;
        height: 20px;
        border: solid 1px black;
        border-radius: 9999px;
        left: 10px;
        background: #FFBFBF;
    } */
</style>