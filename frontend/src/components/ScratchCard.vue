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

export default defineComponent({
  name: 'ScratchCard',
  setup() {
    onMounted(() => {
      const scratchCard = document.getElementById('scratch-card')
      console.log(scratchCard?.offsetHeight)
      console.log(scratchCard?.offsetWidth)

      const scratch = new ScratchCard("#scratch-card", {
        scratchType: SCRATCH_TYPE.LINE,
        containerWidth: 300,
        containerHeight: 300,
        imageForwardSrc: 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e',
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