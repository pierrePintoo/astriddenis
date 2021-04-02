<template>
      <div class="bar flex flex-col items-end">
        <div>
          <button class="btn bar__top">EN</button>
        </div>
        <div class="nav border-r border-black h-full">
          <ul class="h-full flex flex-col justify-between items-end">
            <li class="nav__item text-small flex items-center"><a href="#" class="font-bold">Home</a><span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-black mb-1"></span></li>
            <li class="nav__item text-small flex items-center"><a href="#">Mes expériences</a><span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink"></span></li>
            <li class="nav__item text-small flex items-center"><a href="#">Contact</a><span class="nav__item__right absolute w-6 h-6 border border-black rounded-full bg-pink mt-1"></span></li>
          </ul>
        </div>
      </div>
</template>

<script>
    export default {
        name: 'Bar',
        data () {
            return {
            }
        },
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
</style>