<template>
  <div>
    <QrcodeStream :track="paintBoundingBox" @detect="onDecode"></QrcodeStream>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';

export default defineComponent({
  name: 'IndexPage',
  components: { QrcodeStream },
  setup() {
    function onDecode(data) {
      console.log('detectado')
      console.log(data)
    }

    function paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode
        ctx.lineWidth = 2
        ctx.strokeStyle = '#219D01'
        ctx.strokeRect(x, y, width, height)
      }
    }

    return {
      onDecode,
      paintBoundingBox
    }
  }
});
</script>
