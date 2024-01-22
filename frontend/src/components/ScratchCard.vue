<template>
  <div :style="{ width: `${data.widthScratch}px`, height: `${data.heightScratch}px`, display: 'block', margin: '0 auto' }">
    <div 
      class="scratch-card-container"
      id="scratch-card"
    >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
import {ScratchCard, SCRATCH_TYPE} from "scratchcard-js"
import frontScratchCardImage from "../../public/assets/front-scratch-card.jpeg"

export default defineComponent({
  name: "ScratchCard",
  setup() {
    const data = {
      widthScratch: 300,
      heightScratch: 300
    }

    onMounted(() => {
      const scratch = new ScratchCard("#scratch-card", {
        scratchType: SCRATCH_TYPE.LINE,
        containerWidth: data.widthScratch,
        containerHeight: data.heightScratch,
        imageForwardSrc: frontScratchCardImage,
        imageBackgroundSrc: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
        brushSrc: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
        clearZoneRadius: 25,
        nPoints: 0,
        pointSize: 0,
        percentToFinish: 70,
        enabledPercentUpdate: true,
        htmlBackground: "",
        callback: () => {
          return
        }
      })
      scratch.init().then(() => {
      scratch.canvas.addEventListener('scratch.move', () => {
        let percent = scratch.getPercent().toFixed(0)
        console.log(percent+"%")
      })
      }).catch((error) => {
        console.log(error.message)
      })
    })

    return {
      data
    }
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