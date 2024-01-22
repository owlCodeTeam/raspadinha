<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-12 flex justify-center items-center q-my-md">
      <QrReader />
    </div>
    
    <div class="col-12 flex justify-center items-center q-my-md">
      <ScratchCard />
    </div>
  </q-page>
</template>
z'
<script lang="ts">
import { defineComponent } from 'vue';
import ScratchCard from '../components/ScratchCard.vue'
import QrReader from 'src/components/QrReader.vue';
export default defineComponent({
  name: 'IndexPage',
  components: {
    ScratchCard,
    QrReader
  }
});
</script>