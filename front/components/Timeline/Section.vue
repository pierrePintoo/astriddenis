<template>
  <div
    class="section border-l border-black h-screen flex flex-col justify-between pb-14"
    :id="'section' + id"
  >
    <div class="section__top">
      <span class="section__bullet btn bg-pink block absolute"></span>
      <h2 class="section__title ml-16 text-big title-font title-medium">{{ title }}</h2>
    </div>
    <div class="section__img" ref="sectionImg">
      <img v-for="image in images" :key="image.id" :src="'http://localhost:1337' + image.url" class="section__img__item" :id="'img__item__' + image.id" alt="" />
    </div>
    <div class="section__bottom flex align-center">
      <button class="btn section__bottom__left ml-14">
        <play-button
          width="22"
          height="22"
          class="pl-1"
          style="margin: auto;"
          :audioURL="audio.url"
        />
      </button>
      <a href="#" class="ml-6 text-linkBig">Écouter mes souvenirs</a>
    </div>
  </div>
</template>

<script>
import PlayButton from "../Icons/PlayButton.vue";

export default {
  name: "Section",
  props: ["windowHeight", "title", "images", "audio", "id"],
  components: { PlayButton },
  data() {
    return {
      sectionsScrolled: [],
      imgIsLoaded: false,
      isLoading: true
    };
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  },
  mounted() {
    const imagesSection = this.$refs.sectionImg
    const images = imagesSection.childNodes

    for(let i = 0; i < images.length; i++) {
      images[i].style.marginLeft = `${this.getRandomInt(15, 70)}px`
      images[i].style.transform = `rotate(${this.getRandomInt(-30, 30)}deg)`
    }
  }
  // created() {
  //   let imagesLoaded = 0;
  //   let imgArray = [];
  //   for (const image of this.images) {
  //     const img = new Image();
  //     img.src = "http://localhost:1337" + image.url;

  //     img.onload = () => {
  //       imagesLoaded++;
  //       imgArray.push(img);
  //       if (imagesLoaded === this.images.length) {
  //         console.log("La section a load toutes les images");
  //         this.isLoading = false;
  //         let left = -450;
  //         let top = 150;
  //         for (let i = 0; i < imgArray.length; i++) {
  //           // imgArray[i].style.height = `${20}%`;
  //           imgArray[i].style.width = `${40}%`;
  //           console.log('WESH', imgArray[i].style)

  //           // imgArray[i].style.position = `absolute`;
  //           if (left < 600) {
  //             // Offset of 30px between each image
  //             console.log(imgArray[i].style.width);
  //             left += imgArray[i].style.width;
  //             left += 30;
  //             imgArray[i].style.top = `${top}px`;
  //             imgArray[i].style.left = `${left}px`;
  //           } else {
  //             // New row and
  //             left = -100;
  //             top += 250;
  //             imgArray[i].style.top = `${top}px`;
  //             imgArray[i].style.left = `${left}px`;
  //           }
  //           this.$refs.sectionImg.appendChild(imgArray[i]);
  //         }
  //         console.log("END", this.$refs.sectionImg);
  //       }
  //     };
  //   }
  // }
};
</script>
<style scoped>
.section {
  padding-top: 3.75rem;
  position: relative;
}

.section__bullet {
  left: -27px;
}

.section__img {
  width: 90%;
  display: flex;
  height: 80%;
  flex-wrap: wrap;
  margin-top: 60px;
  margin: 60px 0 0 60px;
}

.section__img__item {
  height: 30%;
  margin: 0 40px;
  /* position: absolute;
  top: 17%;
  left: -5%; */
}
</style>