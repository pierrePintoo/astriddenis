<template>
      <div :style="{height: `${this.barHeight}px`}" class="bar flex flex-col items-end pb-14 sticky">
        <div>
          <button class="btn bar__top relative">EN</button>
        </div>
        <div class="nav border-r border-black">
          <ul class="h-full flex flex-col justify-between items-end">
            <li class="nav__item nav__item--first text-small flex items-center"><a href="#" class="font-bold">Home</a><span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-black mb-1"></span></li>
            <li class="nav__item text-small flex items-center"><a href="#">Mes expériences</a><span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mb-1"></span></li>
            <li class="nav__item nav__item--last text-small flex items-center"><a href="#">Contact</a><span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mt-1"></span></li>
          </ul>
        </div>
      </div>
</template>

<script>
    export default {
        name: 'Bar',
        props: ["barHeight"],
        data () {
            return {
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