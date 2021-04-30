<template>
    <div class="play-button" @click="togglePlay()">
        <audio ref="audio">
            <source :src="'http://localhost:1337' + audioURL" type="audio/ogg">
        </audio>
        <svg v-if="isMute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 30" :aria-labelledby="iconName" :width="width" :height="height">
            <title :id="iconName"> {{iconName}} </title>
            <g id="Polygone_1" data-name="Polygone 1" transform="translate(26) rotate(90)" fill="#ffbfbf">
                <path d="M 29.13430023193359 25.5 L 0.8657025098800659 25.5 L 15.00000095367432 1.00054931640625 L 29.13430023193359 25.5 Z" stroke="none"/>
                <path d="M 15.00000095367432 2.001115798950195 L 1.731414794921875 25 L 28.26858711242676 25 L 15.00000095367432 2.001115798950195 M 15.00000095367432 0 L 30 26 L 1.9073486328125e-06 26 L 15.00000095367432 0 Z" stroke="none" fill="#000"/>
            </g>
        </svg>
        <svg v-if="!isMute" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 13.5 29.5">
            <g id="Groupe_2" data-name="Groupe 2" transform="translate(-258 -2011)">
                <line id="Ligne_12" data-name="Ligne 12" y2="29" transform="translate(271 2011)" fill="none" stroke="#000" stroke-width="1"/>
                <path id="Tracé_21" data-name="Tracé 21" d="M0,0V29" transform="translate(258.5 2011.5)" fill="none" stroke="#000" stroke-width="1"/>
            </g>
        </svg>

    </div>
</template>
<script>
    export default {
        props: {
            iconName: {
                    type: String,
                    default: 'playButton'
                },
            width: {
                type: [Number, String],
                default: 18
            },
            height: {
                type: [Number, String],
                default: 18
            },
            iconColor: {
                type: String,
                default: 'currentColor'
            },
            audioURL: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isMute: true
            }
        },
        methods: {
            togglePlay: function() {
                this.isMute = !this.isMute
                if(this.isMute === false) {
                    this.$refs.audio.play()
                } else {
                    this.$refs.audio.pause()
                }
            }
        },
        mounted() {
            this.$refs.audio.load()
        }
    }
</script>
<style scoped>
 .play-button {
     padding: 16px;
 }
</style>