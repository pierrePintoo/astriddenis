<template>
      <div :style="{height: `${this.barHeight - 60}px`}" class="bar flex flex-col items-end pb-14 sticky">
        <div>
          <button @click="switchLanguage()" v-if="$store.state.language === 'fr'" class="btn bar__top relative pr-1">EN</button>
          <button @click="switchLanguage()" v-else class="btn bar__top relative pr-1">FR</button>
        </div>
        <div class="nav border-r border-black">
          <ul class="h-full flex flex-col justify-between items-end">
            <li @click.stop="onLandingBlockClick()" class="nav__item nav__item--first text-small flex items-center">
                <a class="nav__item__label" :class="{labelActive: isActive.landingBlock}"> {{ homeContent.home_bar_label}}
                    <span class="nav__item__right landing__block__item__inner absolute w-6 h-6 border border-black rounded-full bg-pink mb-1" :class="{active: isActive.landingBlock}"></span>
                </a>
            </li>
            <transition name="fade">
                <li @click.stop="handleExperiences('click')" v-if="notShowExperiences" class="nav__item text-small flex items-center">
                    <a class="nav__item__label"> {{ homeContent.experiences_bar_label}}
                        <span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mb-1" ></span>
                    </a>
                </li>
            </transition>
            <transition name="fade">
                <div v-show="showExperiences" class="h-full flex flex-col justify-around" ref="experiences">
                    <li v-for="experience in experiences" :key="experience.id" @click.stop="handleExperience($event, 'click', experience.id)" :id="'section__item' + experience.id" class="nav__item section__item text-small flex items-center">
                        <a class="nav__item__label">{{ experience.title }}
                            <span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mb-1"></span>
                        </a>
                    </li>
                </div>
            </transition>
            <li @click.stop="onContactClick()" class="nav__item nav__item--last text-small flex items-center">
                <a class="nav__item__label" :class="{labelActive: isActive.contact}"> {{ homeContent.contact_bar_label}} 
                    <span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mt-1" :class="{active: isActive.contact}"></span>
                </a>
            </li>
          </ul>
        </div>
      </div>
</template>

<script>
    import axios from "axios"
    import gsap from "gsap"
    import ScrollToPlugin from "gsap/ScrollToPlugin"
    gsap.registerPlugin(ScrollToPlugin)

    export default {
        name: 'Bar',
        props: ["barHeight", "experiences"],
        data () {
            return {
                isActive: {
                    landingBlock: true,
                    contact: false,
                },
                showExperiences: false,
                notShowExperiences: true,
                homeContent: [],
                scroll,
                sectionCounter: null
            }
        },
        methods: {
            onLandingBlockClick: function() {
                this.goToSection('Landing')
                this.resetActivesClass()
                this.showExperiences = false
                setTimeout(() => {
                    this.notShowExperiences = true
                }, 500)
                this.isActive.landingBlock = true
            },
            handleExperiences: function(handleType) {
                if(handleType === "click") {
                    this.goToSection(this.experiences[0].id)
                    this.resetActivesClass()
                    this.notShowExperiences = false
                    setTimeout(() => this.showExperiences = true, 500)
                    setTimeout(() => this.$refs.experiences.children[0].children[0].children[0].classList.add('active'), 600)
                } else if (handleType === "scroll"){
                    this.resetActivesClass()
                    this.notShowExperiences = false
                    setTimeout(() => this.showExperiences = true, 500)
                    setTimeout(() => this.$refs.experiences.children[0].children[0].children[0].classList.add('active'), 600)
                }
            },
            onContactClick: function() {
                this.goToSection("Contact")
                this.resetActivesClass()
                this.isActive.contact = true
            },
            handleExperience: function(e, handleType, id) {
                this.resetActivesClass()
                if(handleType === "click"){
                    this.goToSection(id)
                    if(e.target.localName === "span") {
                        e.target.classList.add('active')
                        e.target.parentElement.classList.add('labelActive')
                    } else if (e.target.localName === "a") {
                        e.target.children[0].classList.add('active')
                        e.target.classList.add('labelActive')
                    }
                } else if (handleType === "scroll") {
                    if(e.localName === "span") {
                        e.classList.add('active')
                        e.parentElement.classList.add('labelActive')
                    } else if (e.localName === "a") {
                        e.children[0].classList.add('active')
                        e.classList.add('labelActive')
                    }
                }

            },
            resetActivesClass: function() {
                Object.keys(this.isActive).forEach( item => this.isActive[item] = false)
                if(this.$refs.experiences) {
                                            //li                      //a             //span
                    this.$refs.experiences.children.forEach( item => item.children[0].children[0].classList.remove('active'))
                    this.$refs.experiences.children.forEach( item => item.children[0].classList.remove('labelActive'))
                }
            },
            switchLanguage: function() {
                if(this.$store.state.language === 'fr') {
                    this.$store.commit('switchLanguage', 'en')
                } else {
                    this.$store.commit('switchLanguage', 'fr')
                }
            },
            onScroll: function() {
                document.getElementsByClassName('landing__block__item__inner')[0].classList.remove('active')
                this.notShowExperiences = false
            },
            getDatas: async function(url) {
                try {
                    // this.articles = await this.$strapi.$articles.find()
                    const response = await axios.get(url)
                    return response.data
                } catch (error) {
                    console.log(error)
                }
            },
            goToSection: function(id) {
                gsap.to(window, {duration: 1, scrollTo: "#section" + id, ease: "power4.inOut"})
            }
        },
        beforeMount() {
            let response = this.getDatas('http://localhost:1337/accueil')
            response.then( value => this.homeContent = value )
            this.$store.watch(() => {
                if(this.$store.state.language === 'en') {
                    let response = this.getDatas('http://localhost:1337/accueil?_locale=en')
                    response.then( value => this.homeContent = value )
                    } else if (this.$store.state.language === 'fr') {
                    let response = this.getDatas('http://localhost:1337/accueil')
                    response.then( value => this.homeContent = value )
                }
            })
        },
        mounted(){
            const windowH = window.innerHeight
            window.addEventListener('scroll', e => {
                if(window.scrollY >= windowH / 2) {

                    this.sectionCounter = 0
                }
            })
        },
        watch: {
            sectionCounter: function (val) {
                let sections = document.getElementsByClassName('section__item')
                this.handleExperiences('scroll')
                this.handleExperience(sections[val], 'scroll')
            }
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

    .labelActive {
        font-weight: 700;
    }

    /* Transitions properties */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>