<template>
  <q-page class="row items-center justify-evenly">
    <!--
    <ScratchCard />
    -->
    <QrReader />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//import ScratchCard from '../components/ScratchCard.vue'
import QrReader from 'src/components/QrReader.vue';
export default defineComponent({
  name: 'IndexPage',
  components: {
    //ScratchCard,
    QrReader
  }
});
</script>