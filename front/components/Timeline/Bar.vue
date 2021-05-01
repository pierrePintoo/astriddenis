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
                    <span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mb-1" :class="{active: isActive.landingBlock}"></span>
                </a>
            </li>
            <li @click.stop="onExperiencesClick()" v-if="!showExperiences" class="nav__item text-small flex items-center">
                <a class="nav__item__label"> {{ homeContent.experiences_bar_label}}
                    <span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mb-1" ></span>
                </a>
            </li>
            <div v-if="showExperiences" class="h-full flex flex-col justify-around" ref="experiences">
                <li v-for="experience in experiences" :key="experience.id" @click.stop="onExperienceClick($event, experience.id)" class="nav__item text-small flex items-center">
                    <a class="nav__item__label">{{ experience.title }}
                        <span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mb-1" ></span>
                    </a>
                </li>
            </div>
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
                homeContent: []
            }
        },
        methods: {
            onLandingBlockClick: function() {
                this.goToSection('Landing')
                this.resetActivesClass()
                this.showExperiences = false
                this.isActive.landingBlock = true
            },
            onExperiencesClick: function() {
                this.goToSection(this.experiences[0].id)
                this.resetActivesClass()
                this.showExperiences = true
                setTimeout(() => this.$refs.experiences.children[0].children[0].children[0].classList.add('active'), 100)
            },
            onContactClick: function() {
                this.goToSection("Contact")
                this.resetActivesClass()
                this.isActive.contact = true
            },
            onExperienceClick: function(e, id) {
                this.goToSection(id)
                this.resetActivesClass()
                if(e.target.localName === "span") {
                    e.target.classList.add('active')
                    e.target.parentElement.classList.add('labelActive')
                } else if (e.target.localName === "a") {
                    e.target.children[0].classList.add('active')
                    e.target.classList.add('labelActive')
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