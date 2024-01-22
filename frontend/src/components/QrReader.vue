<template>
  <div>
    <QrcodeStream 
      @detect="onDecode"
    ></QrcodeStream>
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

    return {
      onDecode
    }
  }
});
</script>
