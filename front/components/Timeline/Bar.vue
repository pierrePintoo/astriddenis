<template>
      <div :style="{ height: barHeight}" class="bar flex flex-col items-end">
        <div>
          <button class="btn bar__top">EN</button>
        </div>
        <div class="nav border-r border-black h-full">
          <ul class="h-full flex flex-col justify-between items-end">
            <li class="nav__item nav__item--first text-small flex items-center relative bottom-1"><a href="#" class="font-bold">Home</a></li>
            <li class="nav__item text-small flex items-center"><a href="#">Mes expériences</a></li>
            <li class="nav__item nav__item--last text-small flex items-center relative top-1"><a href="#">Contact</a></li>
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
        padding-bottom: 6.875rem;
    }
    .nav {
        margin-top: 5.5rem;
        padding-right: 3.5rem;
    }

    .nav__item__right {
        right : 8.0625rem
    }

    .nav__item::after {
        position: relative;
        content: '';
        width: 20px;
        height: 20px;
        border: solid 1px black;
        border-radius: 9999px;
        left: 67px;
        background: #FFBFBF;
    }
</style>