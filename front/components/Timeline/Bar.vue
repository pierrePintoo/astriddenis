<template>
      <div :style="{height: `${this.barHeight - 60}px`}" class="bar flex flex-col items-end pb-14 sticky">
        <div>
          <button @click="switchLanguage()" v-if="$store.state.language === 'fr'" class="btn bar__top relative pr-1">EN</button>
          <button @click="switchLanguage()" v-else class="btn bar__top relative pr-1">FR</button>
        </div>
        <!-- <div class="nav border-r border-black" >
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
        </div> -->
        <div class="bar_container">
            <div>
                <ul class="labels_list">
                    <li ref="homeLabel" class="labels_list__item" @click.stop="onLandingBlockClick($event)">{{ homeContent.home_bar_label}}</li>
                    <li ref="experiencesLabel" class="labels_list__item" @click.stop="handleExperiences('click', $event)">{{ homeContent.experiences_bar_label}}</li>
                    <li ref="contactLabel" class="labels_list__item" @click.stop="onContactClick($event)">{{ homeContent.contact_bar_label}} </li>
                </ul>
            </div>
            <div class="bar_style">
                <span ref="homeBullet" class="bullet" @click.stop="onLandingBlockClick($event)"></span>
                <span ref="experiencesBullet" class="bullet" @click.stop="handleExperiences('click', $event)"></span>
                <span ref="contactBullet" class="bullet" @click.stop="onContactClick($event)"></span>
            </div>
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
                isClicked: false,
                windowH: window.innerHeight,
                windowH2: window.innerHeight / 2,
                newScrollY: 0,
                oldScrollY: 0,
                countExperiences: 0
            }
        },
        methods: {
            onLandingBlockClick: function(e) {
                this.checkSectionCount()
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
                    // this.addFirstActivesClasses()
                } else if (handleType === "scroll"){
                    this.resetActivesClass()
                    this.notShowExperiences = false
                    this.showExperiences = true
                    // this.addFirstActivesClasses()
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
            },
            checkSectionCount: function() {
                this.newScrollY = window.scrollY
                if(this.newScrollY > this.oldScrollY) {
                    // Scroll down
                    if(window.scrollY >= this.windowH / 2 && window.scrollY <= this.windowH + this.windowH2) {
                        this.sectionCounter = 1
                    } 
                    if(window.scrollY > this.windowH * this.sectionCounter + this.windowH2) {
                        this.sectionCounter++
                    }
                } else {
                    // Scroll up
                    if(window.scrollY >= this.windowH / 2 && window.scrollY <= this.windowH + this.windowH2) {
                        this.sectionCounter = 1
                    } else if (window.scrollY < this.windowH * (this.sectionCounter - 1) + this.windowH2) {
                        this.sectionCounter--
                    } else if (this.newScrollY === 0) {
                        this.sectionCounter = 0
                    }
                }
                this.oldScrollY = this.newScrollY
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
            this.checkSectionCount()
            window.addEventListener('scroll', () => {
                this.checkSectionCount()

                this.countExperiences = this.experiences.length
            })
        },
        watch: {
            sectionCounter: function (val) {

                const activeSection = this.sectionCounter
                this.sections = document.getElementsByClassName('nav__item__right')
                if(val === 1){
                    this.handleExperiences('scroll')
                } else if(val < this.sections.length) {
                    this.handleExperience(this.sections[val], 'scroll')
                }

                this.$refs.homeBullet.style.background = this.$store.state.colors.pink
                this.$refs.experiencesBullet.style.background = this.$store.state.colors.pink
                this.$refs.contactBullet.style.background = this.$store.state.colors.pink
                this.$refs.homeLabel.style.fontWeight = 400
                this.$refs.experiencesLabel.style.fontWeight = 400
                this.$refs.contactLabel.style.fontWeight = 400

                switch (activeSection) {
                    case 0:
                        this.$refs.homeBullet.style.background = 'black'
                        this.$refs.homeLabel.style.fontWeight = 600
                        break;
                    case this.countExperiences + 1:
                        this.$refs.contactBullet.style.background = 'black'
                        this.$refs.contactLabel.style.fontWeight = 600
                        break;
                    default:
                        this.$refs.experiencesBullet.style.background = 'black'
                        this.$refs.experiencesLabel.style.fontWeight = 600
                        break;
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

    .bar_container {
        width: 150%;
        height: 100%;
        display: flex;
        padding-top: 50px;
        justify-content: space-between;
    }

    .labels_list {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .bar_style {
        width: 1px;
        background: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .labels_list__item {
        display: block;
        width: 100px;
    }

    .bullet {
        height: 20px;
        width: 20px;
        background: black;
        border-radius: 9999px;
        border-width: 1px;
        position: relative;
        right: 9px;
    }

    .labels_list__item:hover, .bullet:hover {
        cursor: pointer;
    }
</style>