<template>
  <div style="width: 300px; height: 300px; display: block; margin: 0 auto;">
    <div 
      class="bg-red scratch-card-container"
      id="scratch-card"
    >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import {ScratchCard, SCRATCH_TYPE} from 'scratchcard-js'
import frontScratchCardImage from '../../public/assets/front-scratch-card.jpeg'

export default defineComponent({
  name: 'ScratchCard',
  setup() {
    onMounted(() => {
      const scratchCard = document.getElementById('scratch-card')

      const scratch = new ScratchCard("#scratch-card", {
        scratchType: SCRATCH_TYPE.LINE,
        containerWidth: 300,
        containerHeight: 300,
        imageForwardSrc: frontScratchCardImage,
        imageBackgroundSrc: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
        brushSrc: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
        clearZoneRadius: 30,
        nPoints: 0,
        pointSize: 0,
        percentToFinish: 70,
        enabledPercentUpdate: true,
        htmlBackground: '',
        callback: () => {
          console.log('aa')
        }
      })
      
      scratch.init().then(() => {
      scratch.canvas.addEventListener('scratch.move', () => {
        let percent = scratch.getPercent().toFixed(2)
        console.log(percent)
      })
      }).catch((error) => {
        console.log(error.message)
      })
    })
  }
})
</script>

<style>
.scratch-card-container {
  position: relative;
  overflow: hidden;
  height: 300px;
  width: 300px;
}
.scratch-card-container > img {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}
.scratch-card-container canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}
</style>