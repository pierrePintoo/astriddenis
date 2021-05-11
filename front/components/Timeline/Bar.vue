<template>
      <div :style="{height: `${this.barHeight - 60}px`}" class="bar flex flex-col items-end pb-14 sticky">
        <div>
          <button @click="switchLanguage()" v-if="$store.state.language === 'fr'" class="btn bar__top relative pr-1">EN</button>
          <button @click="switchLanguage()" v-else class="btn bar__top relative pr-1">FR</button>
        </div>
        <div class="nav border-r border-black" >
          <ul class="h-full flex flex-col justify-between items-end">
            <li @click.stop="onLandingBlockClick($event)" class="nav__item nav__item--first text-small flex items-center">
                <a class="nav__item__label"> {{ homeContent.home_bar_label}}
                    <span class="nav__item__right landing__block__item__inner absolute w-6 h-6 border border-black rounded-full bg-pink mb-1"></span>
                </a>
            </li>
            <transition name="fade">
                <li @click.stop="handleExperiences('click', $event)" v-if="notShowExperiences" class="nav__item text-small flex items-center">
                    <a class="nav__item__label"> {{ homeContent.experiences_bar_label}}
                        <span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mb-1" ></span>
                    </a>
                </li>
            </transition>
            <transition name="fade">
                <div v-show="showExperiences" class="h-full flex flex-col justify-around" ref="experiences">
                    <li v-for="experience in experiences" :key="experience.id" @click.stop="handleExperience($event, 'click', experience.id)" class="nav__item section__item text-small flex items-center">
                        <a class="nav__item__label">{{ experience.title }}
                            <span :id="'nav__item__right' + experience.id" class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mb-1"></span>
                        </a>
                    </li>
                </div>
            </transition>
            <li @click.stop="onContactClick($event)" class="nav__item nav__item--last text-small flex items-center">
                <a class="nav__item__label"> {{ homeContent.contact_bar_label}} 
                    <span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mt-1"></span>
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
                showExperiences: false,
                notShowExperiences: true,
                homeContent: [],
                scroll,
                sectionCounter: null,
                sections: null,
                isClicked: false
            }
        },
        methods: {
            onLandingBlockClick: function(e) {
                this.isClicked = true
                this.goToSection('Landing')
                this.resetActivesClass()
                this.addActivesClasses(e)
                this.showExperiences = false
                setTimeout(() => this.notShowExperiences = true, 300)
            },
            handleExperiences: function(handleType, e) {
                if(handleType === "click") {
                    this.isClicked = true
                    this.goToSection(this.experiences[0].id)
                    this.notShowExperiences = false
                    setTimeout(() => this.showExperiences = true, 300)
                    this.addFirstActivesClasses()
                } else if (handleType === "scroll"){
                    this.resetActivesClass()
                    this.notShowExperiences = false
                    this.showExperiences = true
                    this.addFirstActivesClasses()
                }
            },
            onContactClick: function(e) {
                this.isClicked = true
                this.goToSection("Contact")
                this.resetActivesClass()
                this.addActivesClasses(e)
            },
            handleExperience: function(e, handleType, id) {
                this.resetActivesClass()
                if(handleType === "click"){
                    this.isClicked = true
                    this.goToSection(id)
                    this.addActivesClasses(e)
                } else if (handleType === "scroll") {
                    if(e.localName === "span") {
                        e.classList.add('active')
                        e.parentElement.parentElement.classList.add('labelActive')
                    }
                }

            },
            addFirstActivesClasses: function() {
                this.$refs.experiences.children[0].children[0].children[0].classList.add('active')
                this.$refs.experiences.children[0].classList.add('labelActive')
            },
            addActivesClasses: function(e) {
                if(e.target.localName === "span") {
                    e.target.classList.add('active')
                    e.target.parentElement.classList.add('labelActive')
                } else if (e.target.localName === "a") {
                    e.target.children[0].classList.add('active')
                    e.target.parentElement.classList.add('labelActive')
                }
            },
            resetActivesClass: function() {
                let navItems = document.getElementsByClassName('nav__item')
                if(this.$refs.experiences) {
                                            //li                      //a             //span
                    navItems.forEach( item => item.children[0].children[0].classList.remove('active') )
                    navItems.forEach( item => item.classList.remove('labelActive') )
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
                    const response = await axios.get(url)
                    return response.data
                } catch (error) {
                    console.log(error)
                }
            },
            goToSection: function(id) {
                gsap.killTweensOf(window)
                gsap.to(window, {duration: 1, scrollTo: "#section" + id, ease: "power4.inOut", onComplete: () => this.isClicked = false})
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
            const windowH2 = windowH / 2
            let newScrollY = 0
            let oldScrollY = 0
            window.addEventListener('scroll', e => {
                newScrollY = window.scrollY
                if(newScrollY > oldScrollY && this.isClicked === false) {
                    // Scroll down
                    if(window.scrollY >= windowH / 2 && window.scrollY <= windowH + windowH2) {
                        this.sectionCounter = 1
                    } 
                    if(window.scrollY > windowH * this.sectionCounter + windowH2){
                        this.sectionCounter++
                    }
                } else if(this.isClicked === false) {
                    // Scroll up
                    if(window.scrollY >= windowH / 2 && window.scrollY <= windowH + windowH2) {
                        this.sectionCounter = 1
                    } else if (window.scrollY < windowH * (this.sectionCounter - 1) + windowH2) {
                        this.sectionCounter--
                    }
                }
                oldScrollY = newScrollY
            })
        },
        watch: {
            sectionCounter: function (val) {
                console.log(this.sectionCounter)
                this.sections = document.getElementsByClassName('nav__item__right')
                if(val === 1){
                    this.handleExperiences('scroll')
                } else if(val < this.sections.length) {
                    this.handleExperience(this.sections[val], 'scroll')
                }
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

    .nav__item {
        padding: 16px;
    }

    .nav__item:hover {
        cursor: pointer;
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
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>